<script lang="ts">
	import { CirclePlusIcon, Loader2Icon, StarIcon, UsersIcon } from 'lucide-svelte'
	import type { Customer, Product } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	import { enhance } from '$app/forms'
	import ItemsQuotationTable from '$lib/components/ItemsQuotationTable.svelte'
	import CreateEditItemDialog from '$lib/components/CreateEditItemDialog.svelte'
	import SearchCustomer from '$lib/components/SearchCustomer.svelte'
	import { getQuotationContext } from '$lib/contexts/quotation.svelte'

	type Props = {
		customersPromise: Promise<Customer[]>
		productsPromise: Promise<Product[]>
	}
	const { customersPromise, productsPromise }: Props = $props()

	const {
		store,
		setCustomer,
		onEditItem,
		onMoveUpItem,
		onSelectItem,
		onDeleteItem,
		onAddItem,
		onDuplicateItem,
		onCloseCreateEditItemDialog,
		onMoveDownItem,
		onOpenCreateEditItemDialog
	} = getQuotationContext()

	console.log(store)

	let showCustomerPickDialog = $state(false)
	let showCreditOption = $state(store.quotation.credit ? true : false)
</script>

<!-- <div> -->
<!-- 	<pre> -->
<!--     {JSON.stringify(getQuotationContext(), null, 2)} -->
<!--   </pre> -->
<!-- </div> -->
{#if showCustomerPickDialog}
	<CustomerPickDialog {customersPromise} bind:showModal={showCustomerPickDialog} {setCustomer} />
{/if}
<div class="flex flex-col gap-8 pt-4 pb-8">
	<article class="">
		<!-- Inputs -->
		<div class="grid grid-cols-12 gap-6">
			<!-- Search form -->
			<SearchCustomer onSearchCustomer={setCustomer} ruc={store.quotation.customer?.ruc} />
			<div class="col-span-4 grid gap-2 lg:col-span-6">
				<label class="label grid gap-2" for="deadline"> Entrega </label>
				<input
					class="input w-full"
					required
					type="number"
					id="deadline"
					bind:value={store.quotation.deadline}
					disabled={store.pending}
				/>
			</div>
			<div class="col-span-12 grid gap-2 md:col-span-3 lg:col-span-6">
				<label class="label grid gap-2" for="customer.name"> Cliente </label>
				{#if store.quotation.customer?.name}
					<p class="text-green-200" id="customer.name">{store.quotation.customer.name}</p>
				{:else}
					<div class="bg-base-content/5 h-12 rounded-lg"></div>
				{/if}
			</div>
			<div class="col-span-12 grid gap-2 md:col-span-6">
				<label class="label grid gap-2" for="address"> Dirección </label>

				{#if store.quotation.customer?.address}
					<p class="text-green-200" id="address">{store.quotation.customer.address}</p>
				{:else}
					<div class="bg-base-content/5 h-12 rounded-lg"></div>
				{/if}
			</div>
			<div class="col-span-6 flex items-center gap-2">
				<label class="label grid gap-2" for="includeIgv">Incluir IGV </label>
				<input
					type="checkbox"
					bind:checked={store.quotation.includeIgv}
					class="checkbox"
					id="includeIgv"
				/>
			</div>

			<div class="col-span-6 flex w-full items-center justify-between">
				{#if store.quotation.customerId}
					<div
						class="flex
	           items-center gap-2"
					>
						<StarIcon
							class={store.quotation.customer?.isRegular ? 'text-primary' : 'text-base-content/50'}
							fill={store.quotation.customer?.isRegular ? 'var(--color-primary)' : 'transparent'}
						/>
						<span class="text-sm"
							>{store.quotation.customer?.isRegular
								? 'Cliente Frecuente'
								: 'Cliente Atendido'}</span
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
					<label class="label grid gap-2" for="credit"> Credito </label>
					<input
						id="credit"
						name="credit"
						type="number"
						class="input grow"
						bind:value={store.quotation.credit}
						placeholder="0"
					/>
				</div>
			{/if}
		</div>

		<!-- Items  -->
		<div class="my-4 flex items-center justify-end">
			<div>
				<button
					aria-label="seleccionar cliente"
					class="btn"
					onclick={() => (showCustomerPickDialog = true)}
				>
					<UsersIcon size={20} /> Clientes
				</button>
				{#await productsPromise}
					...loading
				{:then products}
					<button onclick={onOpenCreateEditItemDialog} class="btn">
						<CirclePlusIcon size={20} />
						<span class="">Agregar</span>
					</button>
					{#if store.showCreateEditModal}
						<CreateEditItemDialog
							bind:showCreateEditModal={store.showCreateEditModal}
							{products}
							closeModal={onCloseCreateEditItemDialog}
							{onEditItem}
							{onAddItem}
						/>
					{/if}
				{/await}
			</div>
		</div>
		<ItemsQuotationTable
			items={store.quotation.items}
			{onEditItem}
			{onDeleteItem}
			{onDuplicateItem}
			{onMoveDownItem}
			{onMoveUpItem}
			{onSelectItem}
		/>

		<footer class="mt-4 flex items-center justify-between">
			<button disabled={store.pending} type="button" class="btn">
				<a href="/quotations">Cancelar</a>
			</button>
			<form
				method="POST"
				use:enhance={() => {
					store.pending = true
					return ({ update }) => {
						store.pending = false
						update({
							reset: false
						})
					}
				}}
			>
				<input type="hidden" name="quotation" value={JSON.stringify(store.quotation)} />
				<button
					class="btn btn-primary"
					disabled={store.quotation.items.length === 0 || store.pending}
					type="submit"
				>
					{store.quotation.id ? 'Actualizar' : 'Crear'}
					{#if store.pending}
						<Loader2Icon class="animate-spin" />
					{/if}
				</button>
			</form>
		</footer>
	</article>
</div>
