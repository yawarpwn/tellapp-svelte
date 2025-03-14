<script lang="ts">
	import type { ActionData, PageData, PageProps } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'
	import { toast } from 'svelte-sonner'

	const { data, form }: PageProps = $props()

	$effect(() => {
		if (form?.error) {
			toast(form.error)
		}
	})
</script>

<svelte:head>
	<title>Crear Cotizacion</title>
</svelte:head>
<CreateUpdateQuotation
	quotation={undefined}
	productsPromise={data.productsPromise}
	customersPromise={data.customersPromise}
/>
