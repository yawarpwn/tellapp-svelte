<script lang="ts">
	import { Loader2Icon, SearchIcon } from 'lucide-svelte'
	import type { CreateQuotationClient, Customer, QuotationItem } from '$lib/types'
	import CustomerPickDialog from '$lib/components/CustomerPickDialog.svelte'
	import { enhance } from '$app/forms'
	import CreateEditItem from '$lib/components/CreateEditItem.svelte'
	import ItemsQuotationTable from '$lib/components/ui/ItemsQuotationTable.svelte'
	const { data, form } = $props()
	let count = $state(0)

	let quotation: CreateQuotationClient = $state({
		credit: undefined,
		deadline: 1,
		isPaymentPending: false,
		customerId: undefined,
		includeIgv: true,
		items: [
			{
				id: 'fjeoeuz',
				qty: 1,
				unitSize: 'und',
				price: 10,
				link: '',
				description:
					'Fibra de vidrio con lamina reflectiva tipo IV HIp primatico fjoaueqo nuevo de fabricacion rusa sin cambio qjiqjldahjlad  2pulgadas x 2mm x 3mts de laro como tu qlo aguit apa ti'
			}
		],
		customer: undefined
	})

	let pending = $state(false)

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

	function onCustomerPick(customer: Pick<Customer, 'id' | 'name' | 'ruc' | 'address'>) {
		quotation = {
			...quotation,
			customer: {
				address: customer.address,
				id: customer.id,
				name: customer.name,
				ruc: customer.ruc,
				isRegular: false
			}
		}
	}

	function onAddItem(item: QuotationItem) {
		quotation = {
			...quotation,
			items: [...quotation.items, item]
		}
	}

	function onEditItem(item: QuotationItem) {
		quotation = {
			...quotation,
			items: quotation.items.map((i) => {
				if (i.id === item.id) return item
				return i
			})
		}
	}

	function onDeleteItem(id: string) {
		quotation = {
			...quotation,
			items: quotation.items.filter((item) => item.id !== id)
		}
	}
	function onDuplicateItem(id: string) {
		const foundItem = quotation.items.find((item) => item.id === id)
		if (!foundItem) return
		quotation = {
			...quotation,
			items: [
				...quotation.items,
				{
					...foundItem,
					id: crypto.randomUUID()
				}
			]
		}
	}
</script>

<div>
	<prev>
		{JSON.stringify({ ...quotation, count }, null, 2)}
	</prev>
	<button onclick={() => {}}>click</button>
</div>
<div class="pb-8">
	<header class="flex justify-between">
		<!-- <BackTo to="/quotations" /> -->
		<a class="btn btn-ghost" href="/quotations">Atras</a>
		{#await data.customers}
			loading..
		{:then customers}
			<CustomerPickDialog {customers} {onCustomerPick} />
		{/await}
	</header>
	<article class="mt-4 flex flex-col gap-4">
		<div class="grid grid-cols-6 gap-3 md:gap-4">
			<form
				use:enhance={() => {
					pending = true
					// `formElement` is this `<form>` element
					// `formData` is its `FormData` object that's about to be submitted
					// `action` is the URL to which the form is posted
					// calling `cancel()` will prevent the submission
					// `submitter` is the `HTMLElement` that caused the form to be submitted
					return async ({ result }) => {
						if (result.type === 'success' && result.data) {
							const fondCustomer = result.data.customer as Customer
							quotation = {
								...quotation,
								customer: {
									...quotation.customer,
									id: fondCustomer.id,
									name: fondCustomer.name,
									ruc: fondCustomer.ruc,
									address: fondCustomer.address,
									isRegular: true
								}
							}
						}
						pending = false
						// `result` is an `ActionResult` object
						// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
					}
				}}
				method="POST"
				action="?/search"
				class="col-span-2 grid gap-2 md:col-span-3"
			>
				<label class="label grid gap-2">
					Ruc
					<div class="relative">
						<input
							name="ruc"
							class="input"
							value={quotation.customer?.ruc || ''}
							placeholder="20610555536"
						/>
						<button type="submit" class="absolute top-1/2 right-2 -translate-y-1/2">
							{#if pending}
								<Loader2Icon class="animate-spin" />
							{:else}
								<SearchIcon />
							{/if}
						</button>
					</div>
				</label>
			</form>
			<label class="label grid gap-2">
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
					<input
						value={quotation.customer?.address || ''}
						class="input"
						id="address"
						name="address"
						type="text"
					/>
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
		<div class="flex items-center justify-between">
			Items
			<div>
				{#await data.products}
					...loading
				{:then products}
					<CreateEditItem {products} {onAddItem} />
				{/await}
			</div>
		</div>
		{#if quotation.items.length > 0}
			<ItemsQuotationTable items={quotation.items} {onEditItem} {onDeleteItem} {onDuplicateItem} />
		{:else}
			<div>no items</div>
		{/if}

		<footer class="flex items-center justify-between">
			<button disabled={false} type="button" class="btn btn-wide">
				<a href="/quotations">Cancelar</a>
			</button>
			<button class="btn btn-wide bg-primary" onclick={handleSubmit}>Crear</button>
		</footer>
	</article>
</div>
