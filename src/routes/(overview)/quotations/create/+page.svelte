<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'

	type Props = {
		form: ActionData
		data: PageData
	}
	const { data, form }: Props = $props()
</script>

<svelte:head>
	<title>Crear Cotizacion</title>
</svelte:head>
<CreateUpdateQuotation
	quotation={undefined}
	productsPromise={data.productsPromise}
	customersPromise={data.customersPromise}
	action="?/create"
/>
