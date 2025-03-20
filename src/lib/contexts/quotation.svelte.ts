import type { CreateQuotationClient, Customer, QuotationItem, QuotationCustomer } from '$lib/types'
import { getContext, setContext } from 'svelte'

export const INITIAL_QUOTATION_STATE: CreateQuotationClient = {
	id: undefined,
	credit: undefined,
	deadline: 1,
	isPaymentPending: false,
	customerId: '',
	includeIgv: true,
	items: [],
	customer: {
		address: '',
		name: '',
		ruc: '',
		isRegular: false
	}
}

type StoreState = {
	quotation: CreateQuotationClient
	showCreateEditModal: boolean
	selectedItemId: null | string
	pending: boolean
}

export function createQuotationState(initialQuotation?: CreateQuotationClient) {
	const store = $state<StoreState>({
		quotation: initialQuotation || INITIAL_QUOTATION_STATE,
		showCreateEditModal: false,
		selectedItemId: null,
		pending: false
	})

	function onSelectItem(id: string) {
		store.selectedItemId = id
		store.showCreateEditModal = true
	}

	//Mathods
	function setCustomer(
		customer: {
			name: string
			ruc: string
			address?: string
			isRegular: boolean
		},
		id?: string
	) {
		store.quotation.customerId = id
		store.quotation.customer = {
			name: customer.name,
			ruc: customer.ruc,
			address: customer.address || '',
			isRegular: customer.isRegular
		}
	}

	function setQuotation(quo: CreateQuotationClient) {
		store.quotation = quo
	}

	function handleAddItem(item: QuotationItem) {
		store.quotation.items = [...store.quotation.items, item]
	}

	function handleEditItem(item: QuotationItem) {
		store.quotation.items = store.quotation.items.map((i) => {
			if (i.id === item.id) return item
			return i
		})
	}

	function handleDeleteItem(id: string) {
		store.quotation.items = store.quotation.items.filter((item) => item.id !== id)
	}

	function handleDuplicateItem(id: string) {
		const foundItem = store.quotation.items.find((item) => item.id === id)
		if (!foundItem) return
		store.quotation.items = [
			...store.quotation.items,
			{
				...foundItem,
				id: crypto.randomUUID()
			}
		]
	}

	function resetCustomer() {
		setCustomer({
			name: '',
			ruc: '',
			address: '',
			isRegular: false
		})
		store.quotation.customerId = undefined
	}

	function move(currentIndex: number, nextIndex: number) {
		const newItems = [...store.quotation.items]
		newItems[currentIndex] = store.quotation.items[nextIndex]
		newItems[nextIndex] = store.quotation.items[currentIndex]
		store.quotation.items = newItems
	}

	function handleMoveUpItem(index: number) {
		if (index > 0) {
			move(index, index - 1)
		}
	}

	function handleMoveDownItem(index: number) {
		if (index < store.quotation.items.length - 1) {
			move(index, index + 1)
		}
	}

	function onCloseCreateEditItemDialog() {
		store.showCreateEditModal = false
		store.selectedItemId = null
	}

	function onOpenCreateEditItemDialog() {
		store.showCreateEditModal = true
		store.selectedItemId = null
	}

	function reset() {
		store.quotation = INITIAL_QUOTATION_STATE
	}

	return {
		store,
		onAddItem: handleAddItem,
		onDeleteItem: handleDeleteItem,
		onEditItem: handleEditItem,
		onDuplicateItem: handleDuplicateItem,
		onMoveUpItem: handleMoveUpItem,
		onMoveDownItem: handleMoveDownItem,
		onSelectItem,
		onCloseCreateEditItemDialog,
		onOpenCreateEditItemDialog,
		setCustomer,
		setQuotation,
		reset,
		resetCustomer
	}
}

const QUOTATION_KEY = Symbol('quotation')

export function setQuotationContext(initialQuotation?: CreateQuotationClient) {
	return setContext(QUOTATION_KEY, createQuotationState(initialQuotation))
}
export function getQuotationContext() {
	return getContext<ReturnType<typeof setQuotationContext>>(QUOTATION_KEY)
}
