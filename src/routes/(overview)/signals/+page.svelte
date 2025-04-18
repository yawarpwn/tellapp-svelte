<script lang="ts">
	import { CircleOff, EditIcon, TrashIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	const { data }: PageProps = $props()

	function openConfirmModal(arg0: {
		id: string
		action: string
		description: string | null | undefined
		title: string
	}): any {
		throw new Error('Function not implemented.')
	}

	function onEdit() {}
</script>

<div class=" rounded-box border-base-content/5 bg-base-10 flex-col gap-2 overflow-x-auto border">
	<table class="table-zebra table [&_td]:p-2">
		<thead>
			<tr>
				<th>Señal</th>
				<th>Titulo</th>
				<th>Codigo</th>
				<th>Categoria</th>
				<th>Ancho</th>
				<th>Alto</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each data.signals as signal (signal.id)}
				<tr>
					<td class="">
						<div class="size-[60px] overflow-hidden">
							<img class="h-full w-full object-contain" src={signal.thumbUrl} />
						</div>
					</td>
					<td>
						{signal.title}
					</td>
					<td class="text-center">
						{signal.code}
					</td>
					<td class="text-center"> categoria </td>
					<td class="text-center">
						{signal.width}
					</td>
					<td class="text-center">
						{signal.height}
					</td>
					<td>
						<div class="flex items-center gap-1">
							<button
								class="btn btn-sm btn-square btn-ghost"
								type="button"
								onclick={() => onEdit(signal.id)}
							>
								<EditIcon class="size-4" />
							</button>
							<button
								onclick={() =>
									openConfirmModal({
										id: signal.id,
										action: '?/delete',
										description: signal.description,
										title: 'Borrar Producto'
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
