import { QUOTATIONS_KEY } from '$lib/constants'
import type { CreateQuotationClient, Customer, QuotationItem, QuotationCustomer } from '$lib/types'
import { getContext, setContext } from 'svelte'

const QUOTATION_KEY = Symbol('quotation')

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
	showCreditOption: boolean
	showCustomerPickDialog: boolean
	showRecuperationDialog: boolean
	selectedItemId: null | string
	pending: boolean
}

type StoreMethods = {
	onAddItem: (item: QuotationItem) => void
	onDeleteItem: (id: string) => void
	onEditItem: (item: QuotationItem) => void
	onDuplicateItem: (id: string) => void
	onMoveUpItem: (index: number) => void
	onMoveDownItem: (index: number) => void
	onSelectItem: (id: string) => void
	onCloseCreateEditItemDialog: () => void
	onOpenCreateEditItemDialog: () => void
	closeRecuperationDialog: () => void
	setCustomer: (customer: QuotationCustomer, customerId?: string) => void
	setQuotation: (quo: CreateQuotationClient) => void
	reset: () => void
}

type StoreContext = {
	store: StoreState
} & StoreMethods

export function setQuotationContext(initialQuotation?: CreateQuotationClient) {
	const store = $state<StoreState>({
		quotation: initialQuotation || INITIAL_QUOTATION_STATE,
		showCreateEditModal: false,
		showCreditOption: false,
		showCustomerPickDialog: false,
		selectedItemId: null,
		pending: false,
		showRecuperationDialog: false
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

	function closeRecuperationDialog() {
		store.showRecuperationDialog = false
	}

	function reset() {
		store.quotation = INITIAL_QUOTATION_STATE
	}

	const context: StoreContext = {
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
		closeRecuperationDialog,
		setCustomer,
		setQuotation,
		reset
	}

	setContext(QUOTATION_KEY, context)
}

export function getQuotationContext() {
	return getContext(QUOTATION_KEY) as StoreContext
}
