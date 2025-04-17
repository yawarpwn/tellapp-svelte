<script lang="ts">
	import type { Agency } from '$lib/types'
	import { CircleOff, EditIcon, IdCardIcon, PhoneIcon, TrashIcon } from 'lucide-svelte'
	import ConfirmDialog from './ConfirmDialog.svelte'

	type Props = {
		agencies: Agency[]
		onEdit: (id: string) => void
	}

	type ConfirmOptions = {
		id: string
		action: string
		description: string
		title: string
	}
	const { agencies: labels, onEdit }: Props = $props()

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
				<th>Razon Social </th>
				<th>Direccion</th>
				<th>Télefono</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each labels as label (label.id)}
				<tr>
					<td class="max-w-[350px]">
						{label.name}
						<p>{label.ruc}</p>
					</td>
					<td>
						<p>{label.address}</p>
					</td>
					<td class="max-w-[350px]">
						<p>
							{label.phone}
						</p>
					</td>
					<td>
						<div class="flex items-center gap-1">
							<button
								class="btn btn-sm btn-ghost btn-square"
								type="button"
								onclick={() => onEdit(label.id)}
							>
								<EditIcon class="size-4" />
							</button>
							<button
								onclick={() =>
									openConfirmModal({
										id: label.id,
										action: '?/delete',
										description: label.name,
										title: 'Borrar Cliente'
									})}
								class="btn btn-square btn-ghost btn-sm text-error"
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
		<article class="card bg-base-300">
			<div class="card-body gap-2 p-3">
				<div class="gap-2">
					<p class="text-center font-semibold uppercase">
						{label.name}
					</p>
					<p class="text-center text-sm">
						{label.address}
					</p>
				</div>
				<div class="bg-base-content/10 h-px"></div>
				<div class="grid grid-cols-3 gap-0">
					<div class="col-span-2 flex items-center gap-2">
						<IdCardIcon class="text-primary size-3.5" />
						{label.ruc}
					</div>
					<div class="col-span-1 flex items-center justify-end gap-3">
						<button onclick={() => onEdit(label.id)} class="btn btn-square btn-sm">
							<EditIcon class="size-4" />
						</button>
						<button
							onclick={() =>
								openConfirmModal({
									id: label.id,
									action: '?/delete',
									description: label.name,
									title: 'Borrar Cliente'
								})}
							class="btn btn-square btn-sm"
						>
							<TrashIcon class="size-4" />
						</button>
					</div>
					{#if label?.phone}
						<div class="col-span-3 inline-flex items-center gap-2">
							<PhoneIcon class="text-primary size-3.5" />
							{label.phone ?? ''}
						</div>
					{/if}
				</div>
			</div>
		</article>
	{:else}
		<p>NO hay resultados</p>
	{/each}
</div>
