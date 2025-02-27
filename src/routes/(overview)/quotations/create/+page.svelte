<script lang="ts">
	import type { CreateQuotationClient } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	const { data } = $props()
	const { customers, products } = data

	const quotation: CreateQuotationClient = $state({
		credit: undefined,
		deadline: 1,
		isPaymentPending: false,
		customerId: undefined,
		includeIgv: true,
		items: [],
		customer: undefined
	})

	let pending = false

	const handleSubmit = () => {
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
</script>

<div>
	<prev>
		{JSON.stringify(quotation, null, 2)}
	</prev>
</div>
<div class="pb-8">
	<header class="flex justify-between">
		<!-- <BackTo to="/quotations" /> -->
		<div class="">
			<CustomerPickDialog {customers} {quotation} />
			<!--   <CustomerPickerDialog -->
			<!--     customersPromise={customers} -->
			<!--     onCustomerPick={pickCustomer} -->
			<!--     customerId={quotation.customerId} -->
			<!--   /> -->
		</div>
	</header>
	<article class="mt-4 flex flex-col gap-4">
		<div class="grid grid-cols-6 gap-3 md:gap-4">
			<div class="col-span-2 grid gap-2 md:col-span-3">
				<label class="text-muted-foreground">
					Entrega
					<input
						class="input"
						required
						type="number"
						id="deadline"
						bind:value={quotation.deadline}
						disabled={pending}
					/>
				</label>
			</div>
			<div class="col-span-6 grid gap-2 md:col-span-3">
				<label class="grid gap-2">
					Cliente
					<input
						class="input"
						id="customer.name"
						name="customer.name"
						type="text"
						value={quotation.customer?.name || ''}
					/>
				</label>
			</div>
			<div class="col-span-6 grid gap-2 md:col-span-3">
				<label class="label grid gap-2">
					Dirección
					<input class="input" id="address" name="address" type="text" />
				</label>
			</div>
			<div class="col-span-3 flex items-center gap-2">
				<label class="label grid gap-2"
					>Incluir IGV
					<input
						type="checkbox"
						bind:checked={quotation.includeIgv}
						class="checkbox"
						id="includeIgv"
					/>
				</label>
			</div>

			<div class="col-span-3 flex w-full items-center justify-between">
				<!-- {quotation.customerId && ( -->
				<!--   <div -->
				<!--     class="flex  -->
				<!--       items-center gap-2" -->
				<!--   > -->
				<!--     <StarIcon class="size-5 text-primary" /> -->
				<!--     <span class="text-sm">Cliente Atendido</span> -->
				<!--   </div> -->
				<!-- )} -->
			</div>

			<div class="col-span-3 flex h-9 items-center gap-2">
				<!-- <Switch -->
				<!--   checked={showCreditOption} -->
				<!--   onCheckedChange={(checked) => toggleCreditOption(checked)} -->
				<!-- /> -->
				<label class="label grid gap-2"
					>Pago a Credito?
					<input class="checkbox" type="checkbox" bind:checked={quotation.isPaymentPending} />
				</label>
			</div>
			<div class="flex items-center gap-2">
				<label class="label grid gap-2">
					<span>Días</span>
					<input
						id="credit"
						name="credit"
						type="number"
						class="w-32 grow"
						bind:value={quotation.credit}
						placeholder="30"
					/>
				</label>
			</div>
		</div>

		<!-- <ItemsQuotationTable -->
		<!--   productsPromise={products} -->
		<!--   onAddItem={addItem} -->
		<!--   items={quotation.items} -->
		<!--   onEditItem={editItem} -->
		<!--   onDeleteItem={deleteItem} -->
		<!--   onDuplicateItem={duplicateItem} -->
		<!--   onMoveDownItem={moveDownItem} -->
		<!--   onMoveUpItem={moveUpItem} -->
		<!-- /> -->
		<footer class="flex items-center justify-between">
			<button disabled={false} type="button" class="px-12">
				<a href="/quotations">Cancelar</a>
			</button>
			<button on:click={handleSubmit}>Crear</button>
		</footer>
	</article>
</div>
