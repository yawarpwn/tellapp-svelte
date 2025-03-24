<script lang="ts">
	import type { LabelType, Product } from '$lib/types'
	import {
		CircleOff,
		DownloadIcon,
		EditIcon,
		FilesIcon,
		LinkIcon,
		Loader2Icon,
		PrinterIcon,
		TrashIcon
	} from 'lucide-svelte'
	import ConfirmDialog from './ConfirmDialog.svelte'
	import { generateLabelPdf } from '$lib/pdf-doc/generate-label-pdf'

	type Props = {
		labels: LabelType[]
		onEdit: (id: string) => void
	}

	type ConfirmOptions = {
		id: string
		action: string
		description: string
		title: string
	}
	const { labels, onEdit }: Props = $props()

	let showConfirmDialog = $state(false)
	let selectedId = $state<undefined | string>(undefined)
	let currentAction = $state<null | string>(null)
	let dialogDescription = $state('')
	let dialogTitle = $state('')

	function openConfirmModal(opt: ConfirmOptions) {
		showConfirmDialog = true
		selectedId = opt.id
		currentAction = opt.action
		dialogDescription = opt.description
		dialogTitle = opt.title
	}

	function closeConfirmModal() {
		showConfirmDialog = false
		selectedId = undefined
		currentAction = null
	}

	function printLabel(label: LabelType) {
		const dd = generateLabelPdf(label)
		dd.print()
	}

	function downloadLabel(label: LabelType) {
		const dd = generateLabelPdf(label)
		dd.download()
	}
</script>

{#if showConfirmDialog && selectedId && currentAction}
	<ConfirmDialog
		bind:open={showConfirmDialog}
		{dialogTitle}
		{dialogDescription}
		{currentAction}
		{selectedId}
		closeModal={closeConfirmModal}
	/>
{/if}

<div
	class=" rounded-box border-base-content/5 bg-base-10 hidden flex-col gap-2 overflow-x-auto border md:flex"
>
	<table class="table-zebra table [&_td]:p-2">
		<thead>
			<tr>
				<th>Destinatario </th>
				<th>Destino / Teléfono</th>
				<th>Agencia / Dirección</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each labels as label (label.id)}
				<tr>
					<td class="max-w-[350px]">
						{label.recipient}
						<p>{label.dniRuc}</p>
					</td>
					<td>
						{label.destination}
						<p>{label.phone}</p>
					</td>
					<td class="max-w-[350px]">
						{label.agency?.name}
						<p>
							{label.agency?.address}
						</p>
					</td>
					<td>
						<div class="flex items-center gap-1">
							<button class="btn btn-xs btn-square" type="button" onclick={() => printLabel(label)}>
								<PrinterIcon class="size-4" />
							</button>
							<button class="btn btn-xs btn-square" type="button" onclick={() => onEdit(label.id)}>
								<EditIcon class="size-4" />
							</button>
							<button
								onclick={() =>
									openConfirmModal({
										id: label.id,
										action: '?/delete',
										description: label.recipient,
										title: 'Borrar Cliente'
									})}
								class="btn btn-square btn-sm"
							>
								<TrashIcon class="size-4" />
							</button>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="7">
						<div class="h-[300px] bg-base-200 flex items-center justify-center gap-4 flex-col">
							<span>Sin Item aún</span>
							<CircleOff size={50} />
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="flex flex-col gap-2 md:hidden">
	{#each labels as label}
		<article class="card bg-base-200">
			<div class="card-body gap-4 p-2">
				<div class="flex gap-4">
					<p class="text-pretty">
						{label.recipient}
					</p>
					<span>{label.dniRuc}</span>
				</div>
				<div class="flex justify-between">
					<span>
						{label.destination.toUpperCase()}
					</span>
					<span>
						{label.phone ?? ''}
					</span>
				</div>
				<div class="flex flex-col gap-1">
					<div class="bg-base-content/20 h-px w-full"></div>
					<div class="text-base-content/50 place-items-center gap-2 text-center text-xs">
						<span>{label.agency?.name}</span>
					</div>
					<div class="bg-base-content/20 h-px w-full"></div>
				</div>
				<div class="card-actions items-center justify-end">
					<div class="flex items-center gap-2">
						<button
							class="btn btn-xs btn-square"
							type="button"
							onclick={() => downloadLabel(label)}
						>
							<DownloadIcon class="size-4" />
						</button>
						<button class="btn btn-xs btn-square" type="button" onclick={() => printLabel(label)}>
							<PrinterIcon class="size-4" />
						</button>
						<button onclick={() => onEdit(label.id)} class="btn btn-square btn-sm">
							<EditIcon class="size-4" />
						</button>
						<button
							onclick={() =>
								openConfirmModal({
									id: label.id,
									action: '?/delete',
									description: label.recipient,
									title: 'Borrar Cliente'
								})}
							class="btn btn-square btn-sm"
						>
							<TrashIcon class="size-4" />
						</button>
					</div>
				</div>
			</div>
		</article>
	{:else}
		<p>NO hay resultados</p>
	{/each}
</div>
