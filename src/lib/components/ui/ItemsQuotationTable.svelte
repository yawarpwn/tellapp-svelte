<script lang="ts">
	import { ChevronDown, ChevronUp, CircleOff, EditIcon, FilesIcon, TrashIcon } from 'lucide-svelte'
	import { slide } from 'svelte/transition'
	import TextEditInput from './TextEditInput.svelte'
	import type { QuotationItem } from '$lib/types'
	import { formatNumberToLocal, getIgv } from '$lib/utils'

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

	const { formatedTotal } = $derived(getIgv(items))
</script>

<div
	class="rounded-box border-base-content/5 bg-base-10 flex flex-col gap-2 overflow-x-auto border"
>
	<table class="table-zebra hidden lg:table">
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
			{#each items as item, index}
				{@const formatedPrice = formatNumberToLocal(item.price)}
				{@const formatedTotal = formatNumberToLocal(item.price * item.qty)}
				<tr>
					<td class="flex items-center gap-1">
						<button
							disabled={index === 0}
							class="btn btn-xs btn-square"
							type="button"
							onclick={() => onMoveUpItem(index)}
						>
							<ChevronUp size={12} />
						</button>
						{index + 1}
						<button
							disabled={index === items.length - 1}
							class="btn btn-xs btn-square"
							type="button"
							onclick={() => onMoveDownItem(index)}
						>
							<ChevronDown size={12} />
						</button>
					</td>
					<td>
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
			{#if items.length > 0}
				<tr>
					<td colspan="4"></td>
					<td class="font-bold">TOTAL</td>
					<td class="font-bold">{formatedTotal}</td>
					<td></td>
				</tr>
			{/if}
		</tbody>
	</table>
	<div class="lg:hidden">
		{#each items as item, index}
			<article class="card bg-base-200 shadow-xs" transition:slide|local>
				<div class="grid gap-4 p-4">
					<div class="flex items-center justify-between [&_button]:size-7 [&_button_svg]:size-4">
						<div class="flex items-center gap-1">
							<button
								disabled={index === 0}
								class="btn btn-square"
								type="button"
								onclick={() => onMoveUpItem(index)}
							>
								<ChevronUp />
							</button>
							<button
								disabled={index === items.length - 1}
								class="btn btn-square"
								type="button"
								onclick={() => onMoveDownItem(index)}
							>
								<ChevronDown />
							</button>
						</div>
						<div class="flex items-center gap-2">
							<button class="btn btn-square" type="button" onclick={() => onDuplicateItem(item.id)}>
								<FilesIcon />
							</button>
							<button class="btn btn-square" type="button" onclick={() => onSelectItem(item.id)}>
								<EditIcon />
							</button>
							<button
								aria-label="borrar item"
								class="btn btn-square"
								type="button"
								onclick={() => onDeleteItem(item.id)}
							>
								<TrashIcon />
							</button>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4">
						<div class="relative flex h-auto w-full">
							<TextEditInput
								as="textarea"
								value={item.description}
								onEdit={(value) => onEditItem({ ...item, description: value })}
								name="description"
							/>
						</div>
					</div>

					<div class="flex h-5 items-center gap-4 text-sm">
						<TextEditInput
							onEdit={(value) => onEditItem({ ...item, unitSize: value })}
							value={item.unitSize}
							type="text"
							name="unitSize"
						/>

						<TextEditInput
							value={item.qty}
							onEdit={(value) => {
								if (Number.isNaN(Number(value))) return
								onEditItem({ ...item, qty: Number(value) })
							}}
							name="qty"
							type="number"
						/>
						<TextEditInput
							onEdit={(value) => {
								if (Number.isNaN(Number(value))) return
								onEditItem({ ...item, price: Number(value) })
							}}
							value={item.price}
							name="price"
							type="number"
						/>
						<div class="text-success flex justify-center rounded px-2 md:px-8">
							S/ {item.price * item.qty}
						</div>
					</div>
				</div>
			</article>
		{:else}
			<div class="h-[300px] bg-base-200 card flex items-center justify-center gap-4">
				<span>Sin Item aún</span>
				<CircleOff size={50} />
			</div>
		{/each}
	</div>
</div>
