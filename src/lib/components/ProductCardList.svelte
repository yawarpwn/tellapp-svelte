<script lang="ts">
	import type { QuotationItem } from '$lib/types'
	import { ChevronDown, ChevronUp, CircleOff, EditIcon, FilesIcon, TrashIcon } from 'lucide-svelte'
	import TextEditInput from '$lib/components/TextEditInput.svelte'
	import { getIgv } from '$lib/utils'
	import { flip } from 'svelte/animate'
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

<div class="relative flex flex-col gap-2 lg:hidden">
	{#each items as item, index (item.id)}
		<article class="card bg-base-200 shadow-xs" animate:flip={{ duration: 300 }}>
			<div class="grid gap-4 p-4">
				<div class="flex items-center justify-between [&_button]:size-7 [&_button_svg]:size-4">
					<div class="flex items-center gap-1">
						<button
							disabled={index === 0}
							class="btn btn-square"
							type="button"
							onclick={() => {
								onMoveUpItem(index)
							}}
						>
							<ChevronUp />
						</button>
						<button
							disabled={index === items.length - 1}
							class="btn btn-square"
							type="button"
							onclick={() => {
								onMoveDownItem(index)
							}}
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

				<div class="grid grid-cols-4">
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
						min="0"
						step="1"
						type="number"
					/>
					<TextEditInput
						onEdit={(value) => {
							if (Number.isNaN(Number(value))) return
							onEditItem({ ...item, price: Number(value) })
						}}
						value={item.price}
						name="price"
						min="0"
						step="any"
						type="number"
					/>
					<div class="text-base-content/80 flex justify-center rounded px-2 md:px-8">
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
	<div class="mt-2 flex justify-end">
		<dl class=" flex gap-4 p-2">
			<dt class="font-bold uppercase">ITEMS :</dt>
			<dd class="">{totalItems}</dd>
		</dl>
		<dl class="bg-muted flex gap-4 p-2">
			<dt class="font-bold uppercase">Total :</dt>
			<dd class="">{formatedTotal}</dd>
		</dl>
	</div>
</div>
