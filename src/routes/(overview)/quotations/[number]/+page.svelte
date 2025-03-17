<script lang="ts">
	import type { PageProps } from './$types'
	import QuotationByNumer from '$lib/components/QuotationByNumer.svelte'
	import QuotationByNumberSkeleton from '$lib/components/QuotationByNumberSkeleton.svelte'
	let { data }: PageProps = $props()
</script>

{#await data.quotationPromise}
	<QuotationByNumberSkeleton />
{:then quotation}
	<QuotationByNumer {quotation} />
{:catch}
	<div>algo salio mal pipipi</div>
{/await}
