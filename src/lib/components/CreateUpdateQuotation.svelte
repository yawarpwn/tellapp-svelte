<script lang="ts">
	import { CirclePlusIcon, Loader2Icon, StarIcon, UsersIcon } from 'lucide-svelte'
	import type { CreateQuotationClient, Customer, Product, QuotationClient } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	import { enhance } from '$app/forms'
	import ItemsQuotationTable from '$lib/components/ItemsQuotationTable.svelte'
	import CreateEditItemDialog from '$lib/components/CreateEditItemDialog.svelte'
	import SearchCustomer from '$lib/components/SearchCustomer.svelte'
	import { getQuotationContext } from '$lib/contexts/quotation.svelte'
	import { QUOTATIONS_KEY, STANDARD_TERMS } from '$lib/constants'

	const CREDIT_OPTION = {
		'1 Semana': 7,
		'2 Semanas': 15,
		'1 Mes': 30
	}

	export const PAYMENT_CODITION = {
		ADVANCE_50: 'Adelanto 50%',
		FULL_PREPAYMENT: 'Previo Pago',
		CREDIT: 'Crédito',
		ADVANCE_20: 'Adelanto 20%',
		ADVANCE_80: 'Adelanto 80%'
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

	function isUpdateQuotation(
		quotation: QuotationClient | CreateQuotationClient
	): quotation is QuotationClient {
		return 'id' in quotation
	}
	$inspect(store.quotation)

	$effect(() => {
		console.log('effect')
		if (store.quotation.paymentCodition === 'CREDIT') {
			store.quotation.credit = 7
		} else {
			store.quotation.credit = null
		}
	})
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
	<form
		class=""
		method="POST"
		use:enhance={() => {
			store.pending = true
			return ({ update }) => {
				store.pending = false
				localStorage.removeItem(QUOTATIONS_KEY)
				update({
					reset: false
				})
			}
		}}
	>
		<!-- Inputs -->
		<div class="grid grid-cols-12 gap-5">
			<!-- Search customer by ruc form -->
			<SearchCustomer onSearchCustomer={setCustomer} ruc={store.quotation.customer?.ruc} />

			<!-- Cliente -->
			<div class="col-span-12 grid gap-1 lg:col-span-6">
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
			<div class="col-span-12 grid gap-1 lg:col-span-6">
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

			<!-- Tiempo Entrega -->
			<div class="col-span-6 grid gap-1 lg:col-span-6">
				<label class="label grid gap-2 text-sm" for="deadline"> T. Entrega </label>
				<div class="input w-full">
					<input
						class="w-full"
						required
						min="1"
						type="number"
						id="deadline"
						bind:value={store.quotation.deadline}
						disabled={store.pending}
					/>
					<span class="badge badge-warning badge-xs">Requerido</span>
				</div>
			</div>

			<!-- Validez -->
			<div class="col-span-6 grid gap-1 lg:col-span-6">
				<label class="label grid gap-2 text-sm" for="validityDays"> Validez</label>

				<div class="input w-full" aria-disabled="true">
					<input
						id="validityDays"
						name="validityDays"
						type="number"
						disabled={store.pending}
						bind:value={store.quotation.validityDays}
					/>
					<span class="badge badge-neutral badge-xs">Opcional</span>
				</div>
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

			<!-- Payment Codition -->
			<div class="col-span-12 grid gap-1">
				<div class="label text-sm">Codición de Pago</div>
				<div class="flex flex-wrap gap-4 py-2">
					{#each Object.entries(PAYMENT_CODITION) as [key, value]}
						<label class="flex shrink-0 items-center gap-2">
							<input
								bind:group={store.quotation.paymentCodition}
								value={key}
								type="radio"
								class="radio radio-sm"
							/>
							<span>
								{value}
							</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Credito -->
			{#if store.quotation.paymentCodition === 'CREDIT'}
				<div class="col-span-12 grid gap-1">
					<div class="label text-sm">Días de crédito</div>
					<div class="flex flex-wrap gap-4 py-4">
						{#each Object.entries(CREDIT_OPTION) as [key, value]}
							<label
								class="flex items-center gap-2"
								data-active={store.quotation.credit === value ? 'true' : 'false'}
							>
								<input
									bind:group={store.quotation.credit}
									{value}
									type="radio"
									class="radio radio-sm"
								/>
								{key}
							</label>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Standard Terms -->
			<div class="col-span-12 grid gap-1">
				<div class="label text-sm">Términos y Garantías</div>
				<div class="flex flex-wrap items-center gap-4 py-4">
					{#each Object.entries(STANDARD_TERMS) as [key, term] (term)}
						<label
							class="flex shrink-0 items-center gap-2"
							data-active={store.quotation.standardTerms.includes(key) ? 'true' : 'false'}
						>
							<input
								value={key}
								bind:group={store.quotation.standardTerms}
								type="checkbox"
								class="checkbox checkbox-sm"
							/>
							{term.key}
						</label>
					{/each}
				</div>
			</div>

			<!-- Observaciones -->
			<div class="col-span-12 grid gap-1">
				<label class="label grid gap-2 text-sm" for="observations"> Observaciones</label>

				<div class="relative" aria-disabled="true">
					<textarea
						id="observations"
						class="textarea h-full w-full resize-none"
						name="observations"
						disabled={store.pending}
						bind:value={store.quotation.observations}
					></textarea>
					<span class="badge badge-neutral badge-xs absolute top-1/2 right-3 -translate-y-1/2"
						>Opcional</span
					>
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
					type="button"
					onclick={() => (showCustomerPickDialog = true)}
				>
					<UsersIcon size={20} /> Clientes
				</button>
				{#await productsPromise}
					...loading
				{:then products}
					<button type="button" onclick={onOpenCreateEditItemDialog} class="btn">
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
			<div class="min-w-[150px]">
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
			</div>
		</footer>
	</form>
</div>
