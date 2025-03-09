<script lang="ts">
	import { Loader2Icon, PlusIcon, SearchIcon, StarIcon } from 'lucide-svelte'
	import type { CreateQuotationClient, Customer, Product, QuotationItem } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	import { enhance } from '$app/forms'
	import ItemsQuotationTable from '$lib/components/ui/ItemsQuotationTable.svelte'
	import CreateEditItemDialog from '$lib/components/CreateEditItemDialog.svelte'
	import SearchCustomer from './SearchCustomer.svelte'

	type Props = {
		quotation: CreateQuotationClient | undefined
		customersPromise: Promise<Customer[]>
		productsPromise: Promise<Product[]>
	}
	const { quotation: quottationFromD, customersPromise, productsPromise }: Props = $props()

	const quotation = $state<CreateQuotationClient>(
		quottationFromD || {
			credit: undefined,
			deadline: 1,
			isPaymentPending: false,
			customerId: undefined,
			includeIgv: true,
			items: [
				{
					id: 'e0313080',
					description: 'default desc',
					qty: 1,
					price: 10,
					cost: 100,
					unitSize: 'und'
				}
			],
			customer: {
				address: '',
				name: '',
				ruc: '',
				isRegular: true
			}
		}
	)

	//$states
	let showCreateEditModal = $state(false)
	let showCreditOption = $state(false)
	let showCustomerPickDialog = $state(false)
	let selectedItemId = $state<null | string>(null)
	const selectedItem = $derived(quotation.items.find((i) => i.id === selectedItemId))
	let pending = $state(false)

	function onSelectItem(id: string) {
		selectedItemId = id
		showCreateEditModal = true
	}

	//Mathods
	function handleSubmit() {
		const formData = new FormData()
		formData.set('quotation', JSON.stringify(quotation))
		fetch('?/create', {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	function setCustomer(
		customer: {
			name: string
			ruc: string
			address?: string
			isRegular: boolean
		},
		id?: string
	) {
		quotation.customerId = id
		quotation.customer = {
			name: customer.name,
			ruc: customer.ruc,
			address: customer.address || '',
			isRegular: customer.isRegular
		}
	}

	export function handleAddItem(item: QuotationItem) {
		quotation.items = [...quotation.items, item]
	}

	function handleEditItem(item: QuotationItem) {
		quotation.items = quotation.items.map((i) => {
			if (i.id === item.id) return item
			return i
		})
	}

	function handleDeleteItem(id: string) {
		quotation.items = quotation.items.filter((item) => item.id !== id)
	}
	function handleDuplicateItem(id: string) {
		const foundItem = quotation.items.find((item) => item.id === id)
		if (!foundItem) return
		quotation.items = [
			...quotation.items,
			{
				...foundItem,
				id: crypto.randomUUID()
			}
		]
	}

	function move(currentIndex: number, nextIndex: number) {
		const newItems = [...quotation.items]
		newItems[currentIndex] = quotation.items[nextIndex]
		newItems[nextIndex] = quotation.items[currentIndex]
		quotation.items = newItems
	}

	function handleMoveUpItem(index: number) {
		if (index > 0) {
			move(index, index - 1)
		}
	}

	function handleMoveDownItem(index: number) {
		if (index < quotation.items.length - 1) {
			move(index, index + 1)
		}
	}
</script>

<svelte:head>
	<title>Crear Cotizacion</title>
</svelte:head>

<!-- <div class="bg-base-300/80 absolute bottom-0 left-0 z-40 h-[500px] max-w-sm p-2 text-blue-300"> -->
<!-- 	<prev> -->
<!-- 		{JSON.stringify({ ...quotation }, null, 2)} -->
<!-- 	</prev> -->
<!-- </div> -->
<div class="flex flex-col gap-8 pb-8">
	<header class="flex justify-between">
		<!-- <BackTo to="/quotations" /> -->
		<a class="btn btn-ghost" href="/quotations">Atras</a>
		{#if showCustomerPickDialog}
			<CustomerPickDialog
				{customersPromise}
				bind:showModal={showCustomerPickDialog}
				{setCustomer}
			/>
		{/if}
		<button
			aria-label="seleccionar cliente"
			class="btn"
			onclick={() => (showCustomerPickDialog = true)}
		>
			Clientes
		</button>
	</header>
	<article class="">
		<!-- Inputs -->
		<div class="grid grid-cols-12 gap-3">
			<!-- Search form -->
			<SearchCustomer onSearchCustomer={setCustomer} ruc={quotation.customer?.ruc} />
			<div class="col-span-6 grid gap-2">
				<label class="label grid gap-2" for="deadline"> Entrega </label>
				<input
					class="input w-full"
					required
					type="number"
					id="deadline"
					bind:value={quotation.deadline}
					disabled={pending}
				/>
			</div>
			<div class="col-span-12 grid gap-2 md:col-span-3 lg:col-span-6">
				<label class="grid gap-2" for="customer.name"> Cliente </label>
				<input
					class="input w-full"
					id="customer.name"
					name="customer.name"
					type="text"
					value={quotation.customer?.name || ''}
				/>
			</div>
			<div class="col-span-12 grid gap-2 md:col-span-6">
				<label class="label grid gap-2" for="address"> Dirección </label>
				<input
					value={quotation.customer?.address || ''}
					class="input w-full"
					id="address"
					name="address"
					type="text"
				/>
			</div>
			<div class="col-span-6 flex items-center gap-2">
				<label class="label grid gap-2" for="includeIgv">Incluir IGV </label>
				<input
					type="checkbox"
					bind:checked={quotation.includeIgv}
					class="checkbox"
					id="includeIgv"
				/>
			</div>

			<div class="col-span-6 flex w-full items-center justify-between">
				{#if quotation.customerId}
					<div
						class="flex
	           items-center gap-2"
					>
						<StarIcon class="text-primary size-5" />
						<span class="text-sm">Cliente Atendido</span>
					</div>
				{/if}
			</div>
			<div class="col-span-6 flex h-10 items-center gap-2">
				<label class="label" for="showCredit"> Credito </label>
				<input bind:checked={showCreditOption} id="showCredit" type="checkbox" class="toggle" />
			</div>
			{#if showCreditOption}
				<div class="col-span-6 flex items-center gap-2">
					<label class="label grid gap-2" for="credit"> Días </label>
					<input
						id="credit"
						name="credit"
						type="number"
						class="input grow"
						bind:value={quotation.credit}
						placeholder="30"
					/>
				</div>
			{/if}
		</div>

		<!-- Items  -->
		<div class="my-4 flex items-center justify-between">
			Items
			<div>
				{#await productsPromise}
					...loading
				{:then products}
					<button onclick={() => (showCreateEditModal = true)} class="btn">
						<PlusIcon />
						<span class="hidden lg:block">Agregar Item</span>
					</button>
					{#if showCreateEditModal}
						<CreateEditItemDialog
							bind:showCreateEditModal
							item={selectedItem}
							{products}
							onEditItem={handleEditItem}
							onAddItem={handleAddItem}
						/>
					{/if}
				{/await}
			</div>
		</div>
		{#if quotation.items.length > 0}
			<ItemsQuotationTable
				items={quotation.items}
				onEditItem={handleEditItem}
				onDeleteItem={handleDeleteItem}
				onDuplicateItem={handleDuplicateItem}
				onMoveDownItem={handleMoveDownItem}
				onMoveUpItem={handleMoveUpItem}
				{onSelectItem}
			/>
		{:else}
			<div>no items</div>
		{/if}

		<footer class="mt-4 flex items-center justify-between">
			<button disabled={false} type="button" class="btn">
				<a href="/quotations">Cancelar</a>
			</button>
			<form
				method="POST"
				class="btn btn-primary"
				action="?/create"
				use:enhance={() => {
					pending = true
					return ({ update }) => {
						pending = false
						update({
							reset: false
						})
					}
				}}
			>
				<input type="hidden" name="quotation" value={JSON.stringify(quotation)} />
				<button
					disabled={quotation.items.length === 0}
					type="submit"
					class=""
					onclick={handleSubmit}>Crear</button
				>
			</form>
		</footer>
	</article>
</div>
