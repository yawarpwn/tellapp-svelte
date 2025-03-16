<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import { FileIcon, FilesIcon, FileUpIcon } from 'lucide-svelte'

	type Props = {
		form: ActionData
		data: PageData
	}
	const { data, form }: Props = $props()
</script>

<svelte:head>
	<title>Actualizar Cotizacion</title>
</svelte:head>

<Breadcrumbs
	breadcrumbs={[
		{ label: 'Cotizaciones', href: '/quotations', icon: FilesIcon },
		{
			label: `#${data.quotationNumber}`,
			href: `/quotations/${data.quotationNumber}`,
			icon: FileIcon
		},
		{ label: 'Actualizar', icon: FileUpIcon }
	]}
/>
<CreateUpdateQuotation
	quotation={data.quotation}
	productsPromise={data.productsPromise}
	customersPromise={data.customersPromise}
/>
