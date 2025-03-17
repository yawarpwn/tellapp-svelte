<script lang="ts">
	import {
		ArrowLeft,
		CirclePlusIcon,
		Loader2Icon,
		PlusIcon,
		StarIcon,
		UsersIcon
	} from 'lucide-svelte'
	import type { CreateQuotationClient, Customer, Product, QuotationItem } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	import { enhance } from '$app/forms'
	import ItemsQuotationTable from '$lib/components/ItemsQuotationTable.svelte'
	import CreateEditItemDialog from '$lib/components/CreateEditItemDialog.svelte'
	import SearchCustomer from '$lib/components/SearchCustomer.svelte'
	import { getQuotationContext, INITIAL_QUOTATION_STATE } from '$lib/contexts/quotation.svelte'
	import { QUOTATIONS_KEY } from '$lib/constants'
	import compare from 'just-compare'

	type Props = {
		customersPromise: Promise<Customer[]>
		productsPromise: Promise<Product[]>
	}
	const { customersPromise, productsPromise }: Props = $props()

	const {
		quotation,
		showCustomerPickDialog,
		showCreditOption,
		showCreateEditModal,
		setCustomer,
		pending,
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

	const empetyQuo = JSON.parse(JSON.stringify(quotation))

	$effect(() => {
		console.log({
			empetyQuo,
			INITIAL_QUOTATION_STATE,
			areEqual: !compare(empetyQuo, INITIAL_QUOTATION_STATE)
		})
		if (!compare(empetyQuo, INITIAL_QUOTATION_STATE)) {
			console.log('saved quotation')
			localStorage.setItem(QUOTATIONS_KEY, JSON.stringify(quotation))
		}
	})
</script>

<!-- <div> -->
<!-- 	<pre> -->
<!--     {JSON.stringify(getQuotationContext(), null, 2)} -->
<!--   </pre> -->
<!-- </div> -->
{#if showCustomerPickDialog}
	<CustomerPickDialog
		{customersPromise}
		bind:showModal={showCustomerPickDialog.value}
		{setCustomer}
	/>
{/if}
<div class="flex flex-col gap-8 pt-4 pb-8">
	<article class="">
		<!-- Inputs -->
		<div class="grid grid-cols-12 gap-6">
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
					disabled={pending.value}
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
				<input
					bind:checked={showCreditOption.value}
					id="showCredit"
					type="checkbox"
					class="toggle"
				/>
			</div>
			{#if showCreditOption.value}
				<div class="col-span-6 flex items-center gap-2">
					<label class="label grid gap-2" for="credit"> Credito </label>
					<input
						id="credit"
						name="credit"
						type="number"
						class="input grow"
						bind:value={quotation.credit}
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
					onclick={() => (showCustomerPickDialog.value = true)}
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
					{#if showCreateEditModal.value}
						<CreateEditItemDialog
							bind:showCreateEditModal={showCreateEditModal.value}
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
			items={quotation.items}
			{onEditItem}
			{onDeleteItem}
			{onDuplicateItem}
			{onMoveDownItem}
			{onMoveUpItem}
			{onSelectItem}
		/>

		<footer class="mt-4 flex items-center justify-between">
			<button disabled={pending.value} type="button" class="btn">
				<a href="/quotations">Cancelar</a>
			</button>
			<form
				method="POST"
				use:enhance={() => {
					pending.value = true
					return ({ update }) => {
						pending.value = false
						update({
							reset: false
						})
					}
				}}
			>
				<input type="hidden" name="quotation" value={JSON.stringify(quotation)} />
				<button
					class="btn btn-primary"
					disabled={quotation.items.length === 0 || pending.value}
					type="submit"
				>
					{quotation.id ? 'Actualizar' : 'Crear'}
					{#if pending.value}
						<Loader2Icon class="animate-spin" />
					{/if}
				</button>
			</form>
		</footer>
	</article>
</div>
