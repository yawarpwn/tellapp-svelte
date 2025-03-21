<script lang="ts">
	import type { PageProps } from './$types'
	import QuotationByNumer from '$lib/components/QuotationByNumer.svelte'
	import QuotationByNumberSkeleton from '$lib/components/QuotationByNumberSkeleton.svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import { FileIcon, FilesIcon } from 'lucide-svelte'
	let { data }: PageProps = $props()
</script>

<Breadcrumbs
	breadcrumbs={[
		{ label: 'Cotizaciones', href: '/quotations', icon: FilesIcon },
		{ label: `#${data.quotationNumber}`, icon: FileIcon }
	]}
/>
{#await data.quotationPromise}
	<QuotationByNumberSkeleton />
{:then quotation}
	<QuotationByNumer {quotation} />
{:catch}
	<div>algo salio mal pipipi</div>
{/await}
