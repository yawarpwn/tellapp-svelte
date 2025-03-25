<script lang="ts">
	import {
		CalendarDaysIcon,
		CirclePlusIcon,
		Loader2Icon,
		MapPinIcon,
		StarIcon,
		UserIcon,
		UsersIcon
	} from 'lucide-svelte'
	import type { CreateQuotationClient, Customer, Product, QuotationClient } from '$lib/types'
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

	$inspect(store.quotation)

	function isUpdateQuotation(
		quotation: QuotationClient | CreateQuotationClient
	): quotation is QuotationClient {
		return 'id' in quotation
	}
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
		<div class="grid grid-cols-12 gap-5">
			<!-- Search customer by ruc form -->
			<SearchCustomer onSearchCustomer={setCustomer} ruc={store.quotation.customer?.ruc} />

			<!-- Tiempo Entrega -->
			<div class="col-span-12 grid gap-1 lg:order-none lg:col-span-6">
				<label class="label grid gap-2 text-sm" for="deadline"> Tiempo Entrega (Dias) </label>
				<div class="input w-full">
					<input
						class="w-full"
						required
						type="number"
						id="deadline"
						bind:value={store.quotation.deadline}
						disabled={store.pending}
					/>
					<span class="badge badge-warning badge-xs">Requerido</span>
				</div>
			</div>

			<!-- Cliente -->
			<div class="col-span-12 grid gap-1 md:col-span-3 lg:col-span-6">
				<label class="label text-sm" for="customer.name"> Razón Social / Nombre Cliente </label>
				{#if store.quotation.customer?.name}
					<p class="text-green-200" id="customer.name">{store.quotation.customer.name}</p>
				{:else}
					<div class="input w-full">
						<input class="" type="text" disabled={store.pending} />
						<span class="badge badge-neutral badge-xs">Opcional</span>
					</div>
				{/if}
			</div>

			<!-- Direccion -->
			<div class="col-span-12 grid gap-1 md:col-span-6">
				<label class="label grid gap-2 text-sm" for="address"> Dirección Cliente</label>

				{#if store.quotation.customer?.address}
					<p class="text-green-200" id="address">{store.quotation.customer.address}</p>
				{:else}
					<div class="input w-full" aria-disabled="true">
						<input type="text" disabled={store.pending} />
						<span class="badge badge-neutral badge-xs">Opcional</span>
					</div>
				{/if}
			</div>

			<!-- Incluir Igv -->
			<div class="col-span-6 flex items-center gap-2">
				<label class="fieldset-label" for="includeIgv">
					<input
						type="checkbox"
						disabled={store.pending}
						bind:checked={store.quotation.includeIgv}
						class="checkbox checkbox-primary checkbox-sm"
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
			<div class="col-span-12 grid gap-1">
				<div class="label textsm">Crédito</div>
				<div class="flex gap-2 overflow-x-auto py-2">
					{#each Object.entries(CREDIT_OPTION) as [key, value]}
						<label
							class="btn data-[active=true]:btn-primary min-w-[100px] md:min-w-[150px]"
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
			<h2 class="font-bold">Items</h2>
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
			<button disabled={store.pending} type="button" class="btn min-w-[150px]">
				<a href="/quotations">Cancelar</a>
			</button>
			<form
				class="min-w-[150px]"
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
				{#if isUpdateQuotation(store.quotation)}
					<input type="hidden" name="id" defaultValue={store.quotation.id} />
					<input type="hidden" name="customerId" defaultValue={store.quotation.customerId} />
				{/if}
				<button
					disabled={store.pending || store.quotation.items.length === 0}
					class="btn btn-wide btn-primary"
					type="submit"
				>
					{isUpdateQuotation(store.quotation) ? 'Actualizar' : 'Crear'}
					{#if store.pending}
						<Loader2Icon class="animate-spin" />
					{/if}
				</button>
			</form>
		</footer>
	</article>
</div>
