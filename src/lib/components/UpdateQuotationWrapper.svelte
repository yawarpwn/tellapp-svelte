<script lang="ts">
	import type { Customer, Product, QuotationClient } from '$lib/types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'
	import { setQuotationContext } from '$lib/contexts/quotation.svelte'

	type Props = {
		quotation: QuotationClient
		productsPromise: Promise<Product[]>
		customersPromise: Promise<Customer[]>
	}
	const { quotation, customersPromise, productsPromise }: Props = $props()

	setQuotationContext(quotation)
</script>

<CreateUpdateQuotation {productsPromise} {customersPromise} />
