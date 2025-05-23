<script lang="ts">
	import { CirclePlusIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import CreateUpdateProductDialog from '$lib/components/CreateUpdateProductDialog.svelte'
	import ProductList from '$lib/components/ProductList.svelte'
	import type { Product, ProductCategory } from '$lib/types'
	import { page } from '$app/state'
	import Fuse from 'fuse.js'

	type Props = {
		products: Product[]
		productsCategories: ProductCategory[]
	}
	const { products, productsCategories }: Props = $props()

	const search = new Fuse(products, {
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
		threshold: 0.5, // determina la similitud mínima para considerar una coincidencia
		minMatchCharLength: 2, // número mínimo de caracteres para considerar una coincidencia
		includeScore: false //default
	})

	let searchTerm = $state('')
	let open = $state(false)
	let selectedId = $state<null | string>(null)
	let selectedCategory = $state('Todos')
	let timeoutid: ReturnType<typeof setTimeout>
	const productToEdit = $derived(products.find((p) => p.id === selectedId))

	const filteredProducts = $derived.by(() => {
		let results = products
		if (searchTerm.trim()) {
			const result = search.search(searchTerm)
			results = result.map((r) => r.item)
		}
		if (selectedCategory !== 'Todos') {
			results = results.filter((p) => p.category === selectedCategory)
		}
		return results
	})

	function onEdit(id: string) {
		open = true
		selectedId = id
	}

	$inspect(selectedCategory)
</script>

{#if open}
	<CreateUpdateProductDialog
		closeModal={() => {
			open = false
			selectedId = null
		}}
		bind:open
		{productsCategories}
		{productToEdit}
	/>
{/if}
<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<form method="GET" class="relative max-w-[180px] md:max-w-[350px]">
			<label class="input px-2">
				<SearchIcon class="h-[1em] opacity-50" />
				<input
					oninput={(ev) => {
						clearTimeout(timeoutid)
						timeoutid = setTimeout(() => {
							searchTerm = (ev.target as HTMLInputElement).value
						}, 300)
					}}
					value={searchTerm}
					name="q"
					type="search"
					class=""
					placeholder="Buscar..."
				/>
				{#if searchTerm}
					<button
						type="button"
						onclick={() => {
							searchTerm = ''
						}}
						class="bg-base-100 text-base-content/50 hover:text-base-content cusrsor-pointer hover:bg-base-300 absolute right-1 z-10 flex size-6 items-center justify-center rounded-full"
					>
						<XIcon class="h-[1em]" />
					</button>
				{/if}
			</label>
		</form>
		<div class="flex gap-2">
			<select bind:value={selectedCategory} class="select hidden md:block">
				<option selected value="Todos">Todos</option>
				{#each productsCategories as category}
					<option value={category.name}>{category.name}</option>
				{/each}
			</select>
			<button onclick={() => (open = true)} class="btn btn-primary">
				<CirclePlusIcon />
				Crear</button
			>
		</div>
	</div>
	<ProductList {onEdit} products={filteredProducts.slice(0, 20)} />
</div>
