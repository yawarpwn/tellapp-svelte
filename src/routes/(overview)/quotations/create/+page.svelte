<script lang="ts">
	import type { ActionData, PageData } from './$types'

	type Props = {
		form: ActionData
		data: PageData
	}
	const { data, form }: Props = $props()

	import { useQuotation } from '$lib/stores/use-quotation.svelte'

	let { quotation, pending, showCreateEditModal, showCreditOption, onSelectItem } = useQuotation()

	//States

	//Funcitions
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

	$effect(() => {
		if (form && form.customer) {
			quotation.customer = {
				isRegular: form.customer.isRegular,
				name: form.customer.name,
				ruc: form.customer.ruc,
				address: form.customer.address || ''
			}
			quotation.customerId = form.customer.id
		}
	})
</script>

<svelte:head>
	<tile>Crear Cotizacion</tile>
</svelte:head>

<div>
	<prev>
		{JSON.stringify({ ...quotation }, null, 2)}
	</prev>
</div>
<div class="pb-8">
	<header class="flex justify-between">
		<!-- <BackTo to="/quotations" /> -->
		<a class="btn btn-ghost" href="/quotations">Atras</a>
		{#await data.customers}
			loading..
		{:then customers}
			<!-- <CustomerPickDialog {customers} {onCustomerPick} /> -->
		{/await}
	</header>
	<!-- <article class=""> -->
	<!-- 	<!-- Inputs --> -->
	<!-- 	<div class="grid grid-cols-12 gap-3"> -->
	<!-- 		<!-- Search form --> -->
	<!-- 		<form -->
	<!-- 			use:enhance={() => { -->
	<!-- 				pending = true -->
	<!-- 				return async ({ update }) => { -->
	<!-- 					pending = false -->
	<!-- 					update() -->
	<!-- 				} -->
	<!-- 			}} -->
	<!-- 			method="POST" -->
	<!-- 			action="?/search" -->
	<!-- 			class="col-span-6 grid gap-2" -->
	<!-- 		> -->
	<!-- 			<label class="label" for="ruc"> Ruc </label> -->
	<!-- 			<div class="relative"> -->
	<!-- 				<input -->
	<!-- 					id="ruc" -->
	<!-- 					name="ruc" -->
	<!-- 					class="input w-full" -->
	<!-- 					oninput={(ev) => { -->
	<!-- 						quotation.customer = { -->
	<!-- 							...quotation.customer, -->
	<!-- 							ruc: ev.currentTarget.value -->
	<!-- 						} -->
	<!-- 					}} -->
	<!-- 					value={quotation.customer?.ruc || ''} -->
	<!-- 					placeholder="20610555536" -->
	<!-- 				/> -->
	<!-- 				<button type="submit" class="absolute top-1/2 right-2 -translate-y-1/2"> -->
	<!-- 					{#if pending} -->
	<!-- 						<Loader2Icon class="animate-spin" /> -->
	<!-- 					{:else} -->
	<!-- 						<SearchIcon /> -->
	<!-- 					{/if} -->
	<!-- 				</button> -->
	<!-- 			</div> -->
	<!-- 		</form> -->
	<!-- 		<div class="col-span-6 grid gap-2"> -->
	<!-- 			<label class="label grid gap-2" for="deadline"> Entrega </label> -->
	<!-- 			<input -->
	<!-- 				class="input w-full" -->
	<!-- 				required -->
	<!-- 				type="number" -->
	<!-- 				id="deadline" -->
	<!-- 				bind:value={quotation.deadline} -->
	<!-- 				disabled={pending} -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!-- 		<div class="col-span-12 grid gap-2 md:col-span-3 lg:col-span-6"> -->
	<!-- 			<label class="grid gap-2" for="customer.name"> Cliente </label> -->
	<!-- 			<input -->
	<!-- 				class="input w-full" -->
	<!-- 				id="customer.name" -->
	<!-- 				name="customer.name" -->
	<!-- 				type="text" -->
	<!-- 				value={quotation.customer?.name || ''} -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!-- 		<div class="col-span-12 grid gap-2 md:col-span-6"> -->
	<!-- 			<label class="label grid gap-2" for="address"> Dirección </label> -->
	<!-- 			<input -->
	<!-- 				value={quotation.customer?.address || ''} -->
	<!-- 				class="input w-full" -->
	<!-- 				id="address" -->
	<!-- 				name="address" -->
	<!-- 				type="text" -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!-- 		<div class="col-span-6 flex items-center gap-2"> -->
	<!-- 			<label class="label grid gap-2" for="includeIgv">Incluir IGV </label> -->
	<!-- 			<input -->
	<!-- 				type="checkbox" -->
	<!-- 				bind:checked={quotation.includeIgv} -->
	<!-- 				class="checkbox" -->
	<!-- 				id="includeIgv" -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!---->
	<!-- 		<div class="col-span-6 flex w-full items-center justify-between"> -->
	<!-- 			{#if quotation.customerId} -->
	<!-- 				<div -->
	<!-- 					class="flex -->
	<!--            items-center gap-2" -->
	<!-- 				> -->
	<!-- 					<StarIcon class="text-primary size-5" /> -->
	<!-- 					<span class="text-sm">Cliente Atendido</span> -->
	<!-- 				</div> -->
	<!-- 			{/if} -->
	<!-- 		</div> -->
	<!-- 		<div class="col-span-6 flex h-10 items-center gap-2"> -->
	<!-- 			<label class="label" for="showCredit"> Credito </label> -->
	<!-- 			<input bind:checked={showCreditOption} id="showCredit" type="checkbox" class="toggle" /> -->
	<!-- 		</div> -->
	<!-- 		{#if showCreditOption} -->
	<!-- 			<div class="col-span-6 flex items-center gap-2"> -->
	<!-- 				<label class="label grid gap-2" for="credit"> Días </label> -->
	<!-- 				<input -->
	<!-- 					id="credit" -->
	<!-- 					name="credit" -->
	<!-- 					type="number" -->
	<!-- 					class="input grow" -->
	<!-- 					bind:value={quotation.credit} -->
	<!-- 					placeholder="30" -->
	<!-- 				/> -->
	<!-- 			</div> -->
	<!-- 		{/if} -->
	<!-- 	</div> -->
	<!---->
	<!-- 	<!-- Items  --> -->
	<!-- 	<div class="flex items-center justify-between"> -->
	<!-- 		Items -->
	<!-- 		<div> -->
	<!-- 			{#await data.products} -->
	<!-- 				...loading -->
	<!-- 			{:then products} -->
	<!-- 				<button onclick={() => (showCreateEditModal = true)} class="btn"> -->
	<!-- 					<PlusIcon /> -->
	<!-- 				</button> -->
	<!-- 				{#if showCreateEditModal} -->
	<!-- 					<!-- <CreateEditItemDialog --> -->
	<!-- 					<!-- 	bind:showModal --> -->
	<!-- 					<!-- 	item={selectedItem} --> -->
	<!-- 					<!-- 	{products} --> -->
	<!-- 					<!-- 	{onEditItem} --> -->
	<!-- 					<!-- 	{onAddItem} --> -->
	<!-- 					<!-- /> --> -->
	<!-- 				{/if} -->
	<!-- 			{/await} -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- 	{#if quotation.items.length > 0} -->
	<!-- 		<ItemsQuotationTable /> -->
	<!-- 	{:else} -->
	<!-- 		<div>no items</div> -->
	<!-- 	{/if} -->
	<!---->
	<!-- 	<footer class="flex items-center justify-between"> -->
	<!-- 		<button disabled={false} type="button" class="btn btn-wide"> -->
	<!-- 			<a href="/quotations">Cancelar</a> -->
	<!-- 		</button> -->
	<!-- 		<form -->
	<!-- 			method="POST" -->
	<!-- 			action="?/create" -->
	<!-- 			use:enhance={() => { -->
	<!-- 				pending = true -->
	<!-- 				return ({ update }) => { -->
	<!-- 					pending = false -->
	<!-- 					update({ -->
	<!-- 						reset: false -->
	<!-- 					}) -->
	<!-- 				} -->
	<!-- 			}} -->
	<!-- 		> -->
	<!-- 			<input type="hidden" name="quotation" value={JSON.stringify(quotation)} /> -->
	<!-- 			<button -->
	<!-- 				disabled={quotation.items.length === 0} -->
	<!-- 				type="submit" -->
	<!-- 				class="btn btn-wide bg-primary" -->
	<!-- 				onclick={handleSubmit}>Crear</button -->
	<!-- 			> -->
	<!-- 		</form> -->
	<!-- 	</footer> -->
	<!-- </article> -->
</div>
