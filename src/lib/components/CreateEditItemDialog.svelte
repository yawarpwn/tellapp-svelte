<script lang="ts">
	import { OctagonAlertIcon, SearchIcon } from 'lucide-svelte'
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import type { Product, QuotationItem } from '$lib/types'
	import { formatNumberToLocal } from '$lib/utils'
	import { on } from 'svelte/events'

	type Props = {
		products: Product[]
		showCreateEditModal: boolean
		onCloseModal: () => void
		item?: QuotationItem | null
		onAddItem: (_item: QuotationItem) => void
		onEditItem: (_item: QuotationItem) => void
	}
	let {
		products,
		onAddItem,
		onEditItem,
		onCloseModal,
		item: itemToEdit,
		showCreateEditModal = $bindable()
	}: Props = $props()

	let inputSearch: HTMLInputElement
	let qtyInput: HTMLInputElement

	//States
	let item = $state<Omit<QuotationItem, 'id'>>(
		itemToEdit || {
			description: '',
			price: 0,
			cost: 0,
			qty: 0,
			unitSize: '',
			link: undefined
		}
	)
	let searchTerm = $state('')

	$effect(() => {
		if (itemToEdit) {
			item = {
				...itemToEdit
			}
		}
		const timer = setTimeout(() => {
			console.info('focus')
			inputSearch.focus()
		}, 100)
		return () => {
			console.info('clear')
			clearTimeout(timer)
		}
	})

	const hits = $derived(
		products.filter(
			(product) =>
				product.description.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
				product.code.toLowerCase().includes(searchTerm.trim().toLowerCase())
		)
	)
</script>

<Dialog bind:showModal={showCreateEditModal} closeModal={onCloseModal}>
	<div class="flex h-[90svh] flex-col gap-2">
		<!-- Search Product -->
		<header class="">
			<div class="flex h-9 w-full items-center rounded-md border pl-2">
				<SearchIcon class="" size={20} />
				<input
					bind:this={inputSearch}
					tabindex="0"
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
						class="hover:bg-base-300 bg-base-200 flex cursor-pointer flex-col gap-1 rounded-sm p-2"
						onclick={() => {
							item = {
								price: hit.price,
								qty: 1,
								unitSize: hit.unitSize,
								cost: hit.cost,
								description: hit.description,
								link: hit.link
							}
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
				<div class="flex h-full items-center justify-center gap-2">
					<strong>Sin Resultados</strong>
					<OctagonAlertIcon />
				</div>
			{/if}
		</div>
		<form
			class="flex flex-col gap-4"
			onsubmit={(ev) => {
				ev.preventDefault()

				if (itemToEdit) {
					onEditItem({
						...item,
						id: itemToEdit.id
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
					class="textarea h-[90px] w-full resize-none p-2"
					bind:value={item.description}
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
						bind:value={item.qty}
					/>
				</div>
				<div class="grid w-full gap-2">
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
				<div class="grid w-full gap-2">
					<label class="label text-xs" for="price"> Precio </label>
					<input class="input" id="price" type="number" name="price" bind:value={item.price} />
				</div>
				<div class="grid w-full gap-2">
					<label class="label text-xs" for="cost"> Costo </label>
					<input class="input" id="cost" disabled name="cost" value={item.cost} />
				</div>
			</div>
			<footer class="flex items-center justify-between">
				<button type="submit" class="btn btn-primary">
					{itemToEdit ? 'Actualizar' : 'Agregar'}
				</button>
				<button class="btn" type="button" onclick={onCloseModal}>Cancelar</button>
			</footer>
		</form>
	</div>
</Dialog>
