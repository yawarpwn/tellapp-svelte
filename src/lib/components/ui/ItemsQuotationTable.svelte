<script lang="ts">
	import { ChevronDown, ChevronUp, EditIcon, FilesIcon, TrashIcon } from 'lucide-svelte'
	import TextEditInput from './TextEditInput.svelte'
	import type { QuotationItem } from '$lib/types'

	type Props = {
		items: QuotationItem[]
		onSelectItem: (_id: string) => void
		onEditItem: (_quo: QuotationItem) => void
		onDeleteItem: (_id: string) => void
		onDuplicateItem: (_id: string) => void
	}

	const { items, onDeleteItem, onDuplicateItem, onEditItem, onSelectItem }: Props = $props()
</script>

<div class="flex flex-col gap-4">
	{#each items as item}
		<article class="card bg-base-200">
			<div class="grid gap-4 p-4">
				<div class="flex items-center justify-between [&_button]:size-7 [&_button_svg]:size-4">
					<div class="flex items-center gap-1">
						<button class="btn btn-square" type="button" onclick={() => {}}>
							<ChevronUp />
						</button>
						<button class="btn btn-square" type="button" onclick={() => {}}>
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
							onInputChange={(value) => onEditItem({ ...item, description: value })}
							name="description"
						/>
					</div>
				</div>

				<div class="flex h-5 items-center gap-4 text-sm">
					<TextEditInput
						onInputChange={(value) => onEditItem({ ...item, unitSize: value })}
						value={item.unitSize}
						type="text"
						name="unitSize"
					/>

					<TextEditInput
						value={item.qty}
						onInputChange={(value) => {
							if (Number.isNaN(Number(value))) return
							onEditItem({ ...item, qty: Number(value) })
						}}
						name="qty"
						type="number"
					/>
					<TextEditInput
						onInputChange={(value) => {
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
	{/each}
</div>
