<script lang="ts">
	import type { LabelType, Product } from '$lib/types'
	import {
		CircleOff,
		EditIcon,
		FilesIcon,
		LinkIcon,
		Loader2Icon,
		PrinterIcon,
		TrashIcon
	} from 'lucide-svelte'
	import ConfirmDialog from './ConfirmDialog.svelte'

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
			{#each labels as product (product.id)}
				<tr>
					<td class="max-w-[350px]">
						{product.recipient}
						<p>{product.dniRuc}</p>
					</td>
					<td>
						{product.destination}
						<p>{product.phone}</p>
					</td>
					<td class="max-w-[350px]">
						{product.agency?.name}
						<p>
							{product.agency?.address}
						</p>
					</td>
					<td>
						<div class="flex items-center gap-1">
							<button
								class="btn btn-xs btn-square"
								type="button"
								onclick={() =>
									openConfirmModal({
										id: product.id,
										action: '?/duplicate',
										description: product.recipient,
										title: 'Duplicar Producto'
									})}
							>
								<PrinterIcon class="size-4" />
							</button>
							<button
								class="btn btn-xs btn-square"
								type="button"
								onclick={() => onEdit(product.id)}
							>
								<EditIcon class="size-4" />
							</button>
							<button
								onclick={() =>
									openConfirmModal({
										id: product.id,
										action: '?/delete',
										description: product.recipient,
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
	{#each labels as product}
		<article class="card bg-base-200">
			<div class="card-body gap-4 p-2">
				<div class="flex gap-4">
					<p class="text-pretty">
						{product.recipient}
					</p>
					<span>{product.dniRuc}</span>
				</div>
				<div class="flex justify-between">
					<span>
						{product.destination.toUpperCase()}
					</span>
					<span>
						{product.phone ?? ''}
					</span>
				</div>
				<div class="flex flex-col gap-1">
					<div class="bg-base-content/20 h-px w-full"></div>
					<div class="text-base-content/50 place-items-center gap-2 text-center text-xs">
						<span>{product.agency?.name}</span>
					</div>
					<div class="bg-base-content/20 h-px w-full"></div>
				</div>
				<div class="card-actions items-center justify-end">
					<div class="flex items-center gap-2">
						<button
							class="btn btn-xs btn-square"
							type="button"
							onclick={() =>
								openConfirmModal({
									id: product.id,
									action: '?/duplicate',
									description: product.recipient,
									title: 'Duplicar Producto'
								})}
						>
							<PrinterIcon class="size-4" />
						</button>
						<button onclick={() => onEdit(product.id)} class="btn btn-square btn-sm">
							<EditIcon class="size-4" />
						</button>
						<button
							onclick={() =>
								openConfirmModal({
									id: product.id,
									action: '?/delete',
									description: product.recipient,
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
