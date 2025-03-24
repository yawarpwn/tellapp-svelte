import type { QuotationItem } from '$lib/types'
type Quo = {
	credit?: number
	number: number
}

type QuotationCustomer = {
	address?: string
	name?: string
	ruc?: string
	isRegular: boolean
}

type State = {
	quotation: Quo
	items: QuotationItem[]
	customer: QuotationCustomer
	showCreateItemModal: boolean
}

export const globalState = $state<State>({
	quotation: {
		credit: undefined,
		number: 100
	},
	items: [],
	customer: {
		address: '',
		name: '',
		ruc: '',
		isRegular: false
	},
	showCreateItemModal: false
})

export function addItem() {
	globalState.items.push({
		id: crypto.randomUUID(),
		description: 'nuevo item',
		qty: 1,
		price: 0,
		cost: 0,
		unitSize: 'und'
	})
}
export function deleteitem() {
	globalState.items.pop()
}

export function setQuotation(quo: Quo) {
	globalState.quotation = quo
}

export function getQuotation() {
	return globalState.quotation
}

export function getItems() {
	return globalState.items
}
