<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'

	type Props = {
		form: ActionData
		data: PageData
	}
	const { data, form }: Props = $props()

	// $effect(() => {
	// 	if (form && form.customer) {
	// 		quotation.customer = {
	// 			isRegular: form.customer.isRegular,
	// 			name: form.customer.name,
	// 			ruc: form.customer.ruc,
	// 			address: form.customer.address || ''
	// 		}
	// 		quotation.customerId = form.customer.id
	// 	}
	// })
</script>

<svelte:head>
	<title>Crear Cotizacion</title>
</svelte:head>
<CreateUpdateQuotation
	quotation={undefined}
	productsPromise={data.productsPromise}
	customersPromise={data.customersPromise}
/>
