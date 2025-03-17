import type { CreateQuotationClient } from '$lib/types'
import { getContext, setContext } from 'svelte'

const quotationKey = Symbol('quotation')

export function setQuotationContext(context: CreateQuotationClient) {
	setContext(quotationKey, context)
}

export function getQuotationContext(): CreateQuotationClient {
	return getContext(quotationKey) as CreateQuotationClient
}
