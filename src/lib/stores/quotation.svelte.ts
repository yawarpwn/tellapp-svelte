import type {
	CreateQuotationClient,
	Customer,
	QuotationClient,
	QuotationItem,
	UpdateQuotationClient
} from '$lib/types'

const QUOTATION_INITIAL_STATE = {
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
}

function createQuotationStore(initialState: CreateQuotationClient) {
	const quotationState = $state<CreateQuotationClient>(initialState)
	let showCreateEditItemDialog = $state(false)

	return {
		//Accesories
		get quotation() {
			return quotationStore
		}
	}
}

export const quotationStore = createQuotationStore(QUOTATION_INITIAL_STATE)
