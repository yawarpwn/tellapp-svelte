<script lang="ts">
	import { ChevronDown, ChevronUp, CircleOff, EditIcon, FilesIcon, TrashIcon } from 'lucide-svelte'
	import TextEditInput from '$lib/components/TextEditInput.svelte'
	import type { QuotationItem } from '$lib/types'
	import { formatNumberToLocal, getIgv } from '$lib/utils'
	import { flip } from 'svelte/animate'
	import ProductCardList from './ProductCardList.svelte'

	type Props = {
		items: QuotationItem[]
		onSelectItem: (_id: string) => void
		onEditItem: (_quo: QuotationItem) => void
		onDeleteItem: (_id: string) => void
		onDuplicateItem: (_id: string) => void
		onMoveDownItem: (_index: number) => void
		onMoveUpItem: (_index: number) => void
	}

	const {
		items,
		onDeleteItem,
		onDuplicateItem,
		onEditItem,
		onSelectItem,
		onMoveDownItem,
		onMoveUpItem
	}: Props = $props()

	const { formatedTotal, totalItems } = $derived(getIgv(items))
</script>

<ProductCardList
	{items}
	{onSelectItem}
	{onEditItem}
	{onDeleteItem}
	{onDuplicateItem}
	{onMoveDownItem}
	{onMoveUpItem}
/>
<div
	class=" rounded-box border-base-content/5 bg-base-10 hidden flex-col gap-2 overflow-x-auto border md:flex"
>
	<table class="table-zebra table [&_td]:p-1">
		<thead>
			<tr>
				<th>Item</th>
				<th>Descripcion</th>
				<th>U/M</th>
				<th>Cantidad</th>
				<th>Precio</th>
				<th>Monto</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item, index (item.id)}
				{@const formatedTotal = formatNumberToLocal(item.price * item.qty)}
				<tr animate:flip={{ duration: 300 }}>
					<td>
						<div>
							<button
								disabled={index === 0}
								class="bg-base-200 hover:bg-base-300 cursor-pointer rounded-md p-1 disabled:cursor-none disabled:opacity-30"
								type="button"
								onclick={() => onMoveUpItem(index)}
							>
								<ChevronUp size={12} />
							</button>
							<button
								disabled={index === items.length - 1}
								class="bg-base-200 hover:bg-base-300 cursor-pointer rounded-md p-1 disabled:cursor-none disabled:opacity-30"
								type="button"
								onclick={() => onMoveDownItem(index)}
							>
								<ChevronDown size={12} />
							</button>
						</div>
					</td>
					<td class="min-w-[500px]">
						<TextEditInput
							as="textarea"
							value={item.description}
							onEdit={(value) => onEditItem({ ...item, description: value })}
							name="description"
						/>
					</td>
					<td>
						<TextEditInput
							onEdit={(value) => onEditItem({ ...item, unitSize: value })}
							value={item.unitSize}
							type="text"
							name="unitSize"
						/>
					</td>
					<td class="text-center">
						<TextEditInput
							value={item.qty}
							onEdit={(value) => {
								if (Number.isNaN(Number(value))) return
								onEditItem({ ...item, qty: Number(value) })
							}}
							name="qty"
							type="number"
						/>
					</td>
					<td class="text-center">
						<TextEditInput
							onEdit={(value) => {
								if (Number.isNaN(Number(value))) return
								onEditItem({ ...item, price: Number(value) })
							}}
							value={item.price}
							name="price"
							type="number"
						/>
					</td>
					<td class="text-center">{formatedTotal}</td>
					<td>
						<div class="flex items-center gap-1">
							<button
								class="btn btn-xs btn-square"
								type="button"
								onclick={() => onDuplicateItem(item.id)}
							>
								<FilesIcon size={14} />
							</button>
							<button
								class="btn btn-xs btn-square"
								type="button"
								onclick={() => onSelectItem(item.id)}
							>
								<EditIcon size={14} />
							</button>
							<button
								aria-label="borrar item"
								class="btn btn-square btn-xs"
								type="button"
								onclick={() => onDeleteItem(item.id)}
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
		{#if items.length > 0}
			<tfoot class="bg-base-200">
				<tr>
					<td colspan="4"></td>
					<td class="font-bold">TOTAL :</td>
					<td class="font-bold">{formatedTotal}</td>
					<td></td>
				</tr>
				<tr>
					<td colspan="4"></td>
					<td class="font-bold">ITEMS :</td>
					<td class="font-bold">{totalItems}</td>
					<td></td>
				</tr>
			</tfoot>
		{/if}
	</table>
</div>
