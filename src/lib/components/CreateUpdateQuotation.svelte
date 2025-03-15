<script lang="ts">
	import { ArrowLeft, Loader2Icon, PlusIcon, StarIcon } from 'lucide-svelte'
	import type { CreateQuotationClient, Customer, Product, QuotationItem } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	import { enhance } from '$app/forms'
	import ItemsQuotationTable from '$lib/components/ItemsQuotationTable.svelte'
	import CreateEditItemDialog from '$lib/components/CreateEditItemDialog.svelte'
	import SearchCustomer from '$lib/components/SearchCustomer.svelte'

	type Props = {
		quotation: CreateQuotationClient | undefined
		customersPromise: Promise<Customer[]>
		productsPromise: Promise<Product[]>
	}
	const { quotation: quottationFromD, customersPromise, productsPromise }: Props = $props()

	const quotation = $state<CreateQuotationClient>(
		quottationFromD || {
			id: undefined,
			credit: undefined,
			deadline: 1,
			isPaymentPending: false,
			customerId: undefined,
			includeIgv: true,
			items: [],
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

	function onCloseCreateEditItemDialog() {
		showCreateEditModal = false
		selectedItemId = null
	}
</script>

<div class="flex flex-col gap-8 pb-8">
	<header class="flex justify-between">
		<!-- <BackTo to="/quotations" /> -->
		<a class="btn btn-ghost" href="/quotations">
			<ArrowLeft />
			<span> Atras </span>
		</a>
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
			<div class="col-span-4 grid gap-2 lg:col-span-6">
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
				<label class="label grid gap-2" for="customer.name"> Cliente </label>
				{#if quotation.customer?.name}
					<p class="text-green-200" id="customer.name">{quotation.customer.name}</p>
				{:else}
					<div class="bg-base-content/5 h-12 rounded-lg"></div>
				{/if}
			</div>
			<div class="col-span-12 grid gap-2 md:col-span-6">
				<label class="label grid gap-2" for="address"> Dirección </label>

				{#if quotation.customer?.address}
					<p class="text-green-200" id="address">{quotation.customer.address}</p>
				{:else}
					<div class="bg-base-content/5 h-12 rounded-lg"></div>
				{/if}
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
						<StarIcon
							class={quotation.customer?.isRegular ? 'text-primary' : 'text-base-content/50'}
							fill={quotation.customer?.isRegular ? 'var(--color-primary)' : 'transparent'}
						/>
						<span class="text-sm"
							>{quotation.customer?.isRegular ? 'Cliente Frecuente' : 'Cliente Atendido'}</span
						>
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
							closeModal={onCloseCreateEditItemDialog}
							onEditItem={handleEditItem}
							onAddItem={handleAddItem}
						/>
					{/if}
				{/await}
			</div>
		</div>
		<ItemsQuotationTable
			items={quotation.items}
			onEditItem={handleEditItem}
			onDeleteItem={handleDeleteItem}
			onDuplicateItem={handleDuplicateItem}
			onMoveDownItem={handleMoveDownItem}
			onMoveUpItem={handleMoveUpItem}
			{onSelectItem}
		/>

		<footer class="mt-4 flex items-center justify-between">
			<button disabled={pending} type="button" class="btn">
				<a href="/quotations">Cancelar</a>
			</button>
			<form
				method="POST"
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
					class="btn btn-primary"
					disabled={quotation.items.length === 0 || pending}
					type="submit"
				>
					{quotation.id ? 'Actualizar' : 'Crear'}
					{#if pending}
						<Loader2Icon class="animate-spin" />
					{/if}
				</button>
			</form>
		</footer>
	</article>
</div>
