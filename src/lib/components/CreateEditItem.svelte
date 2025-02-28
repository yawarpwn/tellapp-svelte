<script lang="ts">
	import { PlusIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import type { Product, QuotationItem } from '$lib/types'
	import { formatNumberToLocal } from '$lib/utils'

	type Props = {
		products: Product[]
		onAddItem: (item: QuotationItem) => void
	}
	const { products, onAddItem }: Props = $props()
	let modalRef: HTMLDialogElement

	let inputSearch: HTMLInputElement
	let qtyInput: HTMLInputElement

	//States
	let description = $state('')
	let price = $state(0)
	let cost = $state(0)
	let qty = $state(0)
	let unitSize = $state('')
	let searchTerm = $state('')
	let link = $state('')

	function reset() {
		description = ''
		price = 0
		cost = 0
		qty = 0
		unitSize = ''
	}

	const hits = $derived(
		products.filter(
			(product) =>
				product.description.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
				product.code.toLowerCase().includes(searchTerm.trim().toLowerCase())
		)
	)

	$inspect({ description, price, cost, qty, unitSize })
</script>

<button
	class="btn"
	onclick={() => {
		modalRef.showModal()
	}}
>
	<PlusIcon />
	Agregar
</button>
<dialog bind:this={modalRef} class="modal">
	<div class="modal-box relative flex h-[95svh] flex-col gap-2">
		<!-- Search Product -->
		<header class="">
			<div class="flex h-9 w-full items-center rounded-md border pl-2">
				<SearchIcon class="" size={20} />
				<input
					bind:this={inputSearch}
					bind:value={searchTerm}
					class="ml-2 w-full border-none outline-none"
					type="search"
					placeholder="Buscar producto"
				/>
			</div>
		</header>
		<!-- List items -->
		<div class="flex flex-1 flex-col gap-2 overflow-y-auto">
			{#if hits.length > 0}
				{#each hits as hit}
					<button
						class="flex flex-col gap-2 rounded-sm border border-neutral-600 p-2"
						onclick={() => {
							description = hit.description
							cost = hit.cost ?? 0
							unitSize = hit.unitSize
							price = hit.price
							link = hit.link || ''
							qty = 1
							qtyInput.focus()
						}}
					>
						<div class="text-muted-foreground line-clamp-2 text-left">
							{hit.description}
						</div>
						<div class="flex items-center justify-between gap-2">
							<span class="badge lowercase">
								{hit.unitSize}
							</span>
							<span class="badge badge-accent uppercase">
								{hit.code}
							</span>
							<span class="badge">
								{formatNumberToLocal(hit.price)}
							</span>
						</div>
					</button>
				{/each}
			{:else}
				<p>sin results</p>
			{/if}
		</div>
		<form
			class="flex flex-col gap-4"
			onsubmit={(ev) => {
				ev.preventDefault()
				onAddItem({
					id: crypto.randomUUID(),
					description,
					price,
					link,
					cost,
					qty,
					unitSize
				})

				ev.currentTarget.reset()
				modalRef.close()
			}}
		>
			<div>
				<textarea
					name="description"
					id="description"
					class="textarea h-[90px] w-full resize-none p-2"
					bind:value={description}
				></textarea>
			</div>

			<div class="flex gap-4">
				<div class="grid w-full gap-2">
					<label class="label text-xs" for="qty"> Cantidad </label>
					<input
						bind:this={qtyInput}
						class="input"
						id="qty"
						name="qty"
						type="number"
						bind:value={qty}
					/>
				</div>
				<div class="grid w-full gap-2">
					<label class="label text-xs" for="unitSize"> Unidad/Medida </label>
					<input class="input" id="unitSize" type="text" name="unitSize" bind:value={unitSize} />
				</div>
			</div>
			<div class="flex gap-4">
				<div class="grid w-full gap-2">
					<label class="label text-xs" for="price"> Precio </label>
					<input class="input" id="price" type="number" name="price" bind:value={price} />
				</div>
				<div class="grid w-full gap-2">
					<label class="label text-xs" for="cost"> Costo </label>
					<input class="input" id="cost" disabled name="cost" bind:value={cost} />
				</div>
			</div>
			<footer class="flex items-center justify-between">
				<button type="submit" class="btn btn-primary">Agregar</button>
				<button
					class="btn"
					type="button"
					onclick={() => {
						modalRef.close()
					}}>Cancelar</button
				>
			</footer>
		</form>
	</div>
	<form method="dialog" class="absolute top-2 right-2">
		<button class="btn btn-xs btn-circle">
			<XIcon />
		</button>
	</form>
</dialog>
