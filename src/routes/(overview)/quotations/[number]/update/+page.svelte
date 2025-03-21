<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import { FileIcon, FilesIcon, FileUpIcon } from 'lucide-svelte'
	import UpdateQuotationWrapper from '$lib/components/UpdateQuotationWrapper.svelte'
	import CreateUpdateQuotationSkeleton from '$lib/components/CreateUpdateQuotationSkeleton.svelte'

	type Props = {
		form: ActionData
		data: PageData
	}
	const { data, form }: Props = $props()
</script>

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

{#await data.quotationPromise}
	<CreateUpdateQuotationSkeleton />
{:then quotation}
	<UpdateQuotationWrapper
		{quotation}
		productsPromise={data.productsPromise}
		customersPromise={data.customersPromise}
	/>
{/await}
