<script lang="ts">
	import { OctagonAlertIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import type { Product, QuotationItem } from '$lib/types'
	import { formatNumberToLocal } from '$lib/utils'
	import { getQuotationContext } from '$lib/contexts/quotation.svelte'
	import Fuse from 'fuse.js'

	const { store } = getQuotationContext()
	const selectedItem = $derived(
		store.quotation.items.find((item) => item.id === store.selectedItemId)
	)

	type Props = {
		products: Product[]
		showCreateEditModal: boolean
		closeModal: () => void
		onAddItem: (_item: QuotationItem) => void
		onEditItem: (_item: QuotationItem) => void
	}
	let {
		products,
		onAddItem,
		onEditItem,
		closeModal,
		showCreateEditModal = $bindable()
	}: Props = $props()

	let inputSearch: HTMLInputElement
	let qtyInput: HTMLInputElement

	//States
	let item = $state<Omit<QuotationItem, 'id'>>(
		selectedItem || {
			description: '',
			price: 0,
			cost: 0,
			qty: 0,
			unitSize: '',
			link: undefined
		}
	)

	let searchTerm = $state('')
	let selectedId = $state<null | string>(null)

	// const hits = $derived(
	// 	products.filter(
	// 		(product) =>
	// 			product.description.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
	// 			product.code.toLowerCase().includes(searchTerm.trim().toLowerCase())
	// 	)
	// )
	// let hits = $state<Product[]>([])

	const fuse = new Fuse(products, {
		keys: [
			{
				name: 'code',
				weight: 1
			},
			{
				name: 'description',
				weight: 0.7
			}
		],
		threshold: 0.3, // determina la similitud mínima para considerar una coincidencia
		minMatchCharLength: 2, // número mínimo de caracteres para considerar una coincidencia
		includeScore: false //default
	})

	let timeoutId: ReturnType<typeof setTimeout> | null = null

	const hits = $derived.by(() => {
		const result = fuse.search(searchTerm)
		return result.map((r) => r.item)
	})

	// function handleSearch(searchTerm: string) {
	// 	if (searchTerm) {
	// 		showhCloseButton = true
	// 	} else {
	// 		showCloseButton = false
	// 	}
	// 	if (timeoutId) {
	// 		clearTimeout(timeoutId)
	// 	}
	//
	// 	timeoutId = setTimeout(() => {
	// 		const result = fuse.search(searchTerm)
	// 		hits = result.map((r) => r.item)
	// 	}, 300)
	// }
</script>

<Dialog bind:open={() => showCreateEditModal, closeModal}>
	<div class="flex h-[90svh] flex-col gap-2">
		<!-- Search Product -->
		<header class="">
			<div class="input w-full">
				<SearchIcon class="size-4 opacity-50" />
				<input
					bind:this={inputSearch}
					tabindex="0"
					bind:this={inputSearch}
					bind:value={searchTerm}
					class=""
					type="search"
					placeholder="Buscar producto"
				/>
				{#if searchTerm}
					<button
						onclick={() => {
							searchTerm = ''
							inputSearch.focus()
						}}
						class="bg-base-content/10 hover:bg-base-content/20 rounded-full p-1"
					>
						<XIcon class="size-3" />
					</button>
				{/if}
			</div>
		</header>
		<!-- List items -->
		<div class="flex flex-1 flex-col gap-2 overflow-y-auto">
			{#if hits.length > 0}
				{#each hits as hit}
					<button
						class="hover:bg-base-300 bg-base-200 data-[active=true]:border-primary data-[active=true]:bg-base-300 flex cursor-pointer flex-col gap-1 rounded-sm border-1 border-dashed border-transparent p-2"
						data-active={selectedId === hit.id ? 'true' : 'false'}
						onclick={() => {
							item = {
								price: hit.price,
								qty: 1,
								unitSize: hit.unitSize,
								cost: hit.cost,
								description: hit.description,
								link: hit.link
							}
							selectedId = hit.id
							qtyInput.focus()
						}}
					>
						<div class="text-muted-foreground line-clamp-2 text-left">
							{hit.description}
						</div>
						<div class="flex items-center justify-between gap-1">
							<span class="badge badge-neutral px-1 py-0.5 lowercase">
								{hit.unitSize}
							</span>
							<span class="badge badge-accent basis-[120px] px-0.5 py-0.5 uppercase">
								{hit.code}
							</span>
							<span class="badge badge-neutral px-1 py-0.5">
								{formatNumberToLocal(hit.price)}
							</span>
						</div>
					</button>
				{/each}
			{:else}
				<div class="flex h-full items-center justify-center gap-2">
					<strong>Sin Resultados</strong>
					<OctagonAlertIcon />
				</div>
			{/if}
		</div>
		<form
			class="flex flex-col gap-2"
			onsubmit={(ev) => {
				ev.preventDefault()

				if (selectedItem) {
					onEditItem({
						...item,
						id: selectedItem.id
					})
				} else {
					onAddItem({
						...item,
						id: crypto.randomUUID()
					})
				}
				ev.currentTarget.reset()
				showCreateEditModal = false
			}}
		>
			<div>
				<textarea
					name="description"
					id="description"
					class="textarea h-[120px] w-full resize-none p-2"
					bind:value={item.description}
				></textarea>
				{#if item.link}
					<div class="text-center">
						<button
							onclick={() => (item.link = undefined)}
							class="text-primary cursor-pointer text-sm italic">Borrar Link</button
						>
					</div>
				{/if}
			</div>

			<div class="flex gap-4">
				<div class="grid w-full gap-1">
					<label class="label text-xs" for="qty"> Cantidad </label>
					<input
						bind:this={qtyInput}
						class="input"
						id="qty"
						name="qty"
						type="number"
						bind:value={item.qty}
					/>
				</div>
				<div class="grid w-full gap-1">
					<label class="label text-xs" for="unitSize"> Unidad/Medida </label>
					<input
						class="input"
						id="unitSize"
						type="text"
						name="unitSize"
						bind:value={item.unitSize}
					/>
				</div>
			</div>
			<div class="flex gap-4">
				<div class="grid w-full gap-1">
					<label class="label text-xs" for="price"> Precio </label>
					<input class="input" id="price" type="number" name="price" bind:value={item.price} />
				</div>
				<div class="grid w-full gap-1">
					<label class="label text-xs" for="cost"> Costo </label>
					<input class="input" id="cost" disabled name="cost" value={item.cost} />
				</div>
			</div>
			<footer class="flex items-center justify-between">
				<button class="btn" type="button" onclick={closeModal}>Cancelar</button>
				<button type="submit" class="btn btn-primary">
					{selectedItem ? 'Actualizar' : 'Agregar'}
				</button>
			</footer>
		</form>
	</div>
</Dialog>
