import type {
	CreateQuotationClient,
	Customer,
	QuotationClient,
	QuotationItem,
	UpdateQuotationClient
} from '$lib/types'

export const quotation: CreateQuotationClient = $state({
	id: undefined,
	credit: undefined,
	deadline: 1,
	isPaymentPending: false,
	customerId: undefined,
	includeIgv: true,
	items: [],
	customer: {
		address: '',
		name: '',
		ruc: '',
		isRegular: true
	}
})

export function createQuotationStore(quotation: QuotationClient) {}
