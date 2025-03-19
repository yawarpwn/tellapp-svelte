<script lang="ts">
	import { CirclePlusIcon, Loader2Icon, StarIcon, UsersIcon } from 'lucide-svelte'
	import type { Customer, Product } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	import { enhance } from '$app/forms'
	import ItemsQuotationTable from '$lib/components/ItemsQuotationTable.svelte'
	import CreateEditItemDialog from '$lib/components/CreateEditItemDialog.svelte'
	import SearchCustomer from '$lib/components/SearchCustomer.svelte'
	import { getQuotationContext } from '$lib/contexts/quotation.svelte'

	const CREDIT_OPTION = {
		Contado: null,
		'1 Semana': 7,
		'2 Semanas': 15,
		'1 Mes': 30
	}

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

	let showCustomerPickDialog = $state(false)
	$inspect(store.quotation.credit)
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
			<!-- Search customer by ruc form -->
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

			<!-- Cliente -->
			<div class="col-span-12 grid gap-2 md:col-span-3 lg:col-span-6">
				<label class="label grid gap-2" for="customer.name"> Cliente </label>
				{#if store.quotation.customer?.name}
					<p class="text-green-200" id="customer.name">{store.quotation.customer.name}</p>
				{:else}
					<div class="bg-base-content/5 h-12 rounded-lg"></div>
				{/if}
			</div>

			<!-- Direccion -->
			<div class="col-span-12 grid gap-2 md:col-span-6">
				<label class="label grid gap-2" for="address"> Dirección </label>

				{#if store.quotation.customer?.address}
					<p class="text-green-200" id="address">{store.quotation.customer.address}</p>
				{:else}
					<div class="bg-base-content/5 h-12 rounded-lg"></div>
				{/if}
			</div>

			<!-- Incluir Igv -->
			<div class="col-span-6 flex items-center gap-2">
				<label class="fieldset-label" for="includeIgv">
					<input
						type="checkbox"
						bind:checked={store.quotation.includeIgv}
						class="checkbox checkbox-primary"
						id="includeIgv"
					/>
					Incluir IGV
				</label>
			</div>

			<!-- Regular Customer -->
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

			<!-- Credito -->
			<div class="col-span-12 grid gap-2 overflow-x-auto">
				<div class="label">Crédito</div>
				<div class="flex gap-2">
					{#each Object.entries(CREDIT_OPTION) as [key, value]}
						<label
							class="btn data-[active=true]:btn-accent min-w-[100px] md:min-w-[150px]"
							data-active={store.quotation.credit === value ? 'true' : 'false'}
						>
							{key}
							<input bind:group={store.quotation.credit} {value} type="radio" class="hidden" />
						</label>
					{/each}
				</div>
			</div>
		</div>

		<!-- Items  -->
		<div class="my-6 flex items-center justify-between">
			<h2 class="font-bold">Productos</h2>
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
