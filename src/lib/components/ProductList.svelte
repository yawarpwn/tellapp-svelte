<script lang="ts">
	import { enhance } from '$app/forms'
	import type { Product } from '$lib/types'
	import { formatNumberToLocal } from '$lib/utils'
	import { CircleOff, EditIcon, FilesIcon, LinkIcon, TrashIcon } from 'lucide-svelte'

	type Props = {
		products: Product[]
		onEdit: (id: string) => void
		onDelete: (id: string) => void
		onDuplicate: (id: string) => void
	}
	const { products, onEdit, onDelete, onDuplicate }: Props = $props()
</script>

<div
	class=" rounded-box border-base-content/5 bg-base-10 hidden flex-col gap-2 overflow-x-auto border md:flex"
>
	<table class="table-zebra table [&_td]:p-2">
		<thead>
			<tr>
				<th>Descripcion</th>
				<th>Categoria</th>
				<th>U/M</th>
				<th>Codigo</th>
				<th>Costo</th>
				<th>Precio</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each products as item, product (item.id)}
				<tr>
					<td class="min-w-[500px]">
						{item.description}
					</td>
					<td>
						{item.category}
					</td>
					<td class="text-center">
						{item.unitSize}
					</td>
					<td class="text-center">
						{item.code}
					</td>
					<td class="text-center">
						{item.cost}
					</td>
					<td class="text-base-content/80 text-center">
						{item.price}
					</td>
					<td>
						<div class="flex items-center gap-1">
							<button
								class="btn btn-xs btn-square"
								type="button"
								onclick={() => onDuplicate(item.id)}
							>
								<FilesIcon size={14} />
							</button>
							<button class="btn btn-xs btn-square" type="button" onclick={() => onEdit(item.id)}>
								<EditIcon size={14} />
							</button>
							<button
								aria-label="borrar item"
								class="btn btn-square btn-xs"
								type="button"
								onclick={() => onDelete(item.id)}
							>
								<TrashIcon size={14} />
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
	{#each products as product}
		<article class="card bg-base-200">
			<div class="card-body gap-4 p-2">
				<p class="text-pretty">
					{product.description}
				</p>
				<div class="flex justify-between">
					<span class="badge badge-neutral badge-sm uppercase">
						{product.category}
					</span>
					<span class="badge badge-neutral badge-sm uppercase">
						{product.code}
					</span>
				</div>

				<div class="flex flex-col gap-0.5">
					<div class="bg-base-content/20 h-px w-full"></div>
					<div class="text-base-content/50 grid grid-cols-3 place-items-center gap-2 text-xs">
						<span>U/M</span>
						<span>Costo</span>
						<span>Precio</span>
					</div>
					<div class="bg-base-content/20 h-px w-full"></div>
				</div>
				<div class="grid grid-cols-3 place-items-center gap-2">
					<span>{product.unitSize}</span>
					<span>{formatNumberToLocal(product.cost)}</span>
					<span>{formatNumberToLocal(product.price)}</span>
				</div>
				<div class="card-actions items-center justify-end">
					<div class="flex items-center gap-2">
						{#if product.link}
							<a href={product.link} class="btn btn-link btn-sm">
								<LinkIcon class="size-4" />
							</a>
						{/if}

						<button
							class="btn btn-xs btn-square"
							type="button"
							onclick={() => onDuplicate(product.id)}
						>
							<FilesIcon class="size-4" />
						</button>
						<button onclick={() => onEdit(product.id)} class="btn btn-square btn-sm">
							<EditIcon class="size-4" />
						</button>
						<form method="POST" action="?/delete" use:enhance>
							<button name="id" value={product.id} class="btn btn-square btn-sm">
								<TrashIcon class="size-4" />
							</button>
						</form>
					</div>
				</div>
			</div>
		</article>
	{:else}
		<p>NO hay resultados</p>
	{/each}
</div>
