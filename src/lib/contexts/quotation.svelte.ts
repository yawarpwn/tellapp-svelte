import { QUOTATIONS_KEY } from '$lib/constants'
import type { CreateQuotationClient, Customer, QuotationItem, QuotationCustomer } from '$lib/types'
import { getContext, setContext } from 'svelte'

const QUOTATION_KEY = Symbol('quotation')
export const INITIAL_QUOTATION_STATE = {
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
		isRegular: false
	}
}

type QuotationContext = {
	quotation: CreateQuotationClient
	showCreateEditModal: { value: boolean }
	showCreditOption: { value: boolean }
	showCustomerPickDialog: { value: boolean }
	selectedItemId: { value: null | string }
	pending: { value: boolean }
	onAddItem: (item: QuotationItem) => void
	onDeleteItem: (id: string) => void
	onEditItem: (item: QuotationItem) => void
	onDuplicateItem: (id: string) => void
	onMoveUpItem: (index: number) => void
	onMoveDownItem: (index: number) => void
	onSelectItem: (id: string) => void
	onCloseCreateEditItemDialog: () => void
	onOpenCreateEditItemDialog: () => void
	setCustomer: (customer: QuotationCustomer, customerId?: string) => void
}

export function setQuotationContext(initialQuotation?: CreateQuotationClient) {
	const quotation = $state<CreateQuotationClient>(initialQuotation || INITIAL_QUOTATION_STATE)

	//$states
	let showCreateEditModal = $state({ value: false })
	let showCreditOption = $state({ value: false })
	let showCustomerPickDialog = $state({ value: false })
	let selectedItemId = $state<{ value: null | string }>({ value: null })
	let pending = $state({ value: false })

	function onSelectItem(id: string) {
		selectedItemId.value = id
		showCreateEditModal.value = true
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
		quotation.customerId = id
		quotation.customer = {
			name: customer.name,
			ruc: customer.ruc,
			address: customer.address || '',
			isRegular: customer.isRegular
		}
	}

	function handleAddItem(item: QuotationItem) {
		quotation.items = [...quotation.items, item]
	}

	function handleEditItem(item: QuotationItem) {
		quotation.items = quotation.items.map((i) => {
			if (i.id === item.id) return item
			return i
		})
	}

	function handleDeleteItem(id: string) {
		quotation.items = quotation.items.filter((item) => item.id !== id)
	}

	function handleDuplicateItem(id: string) {
		const foundItem = quotation.items.find((item) => item.id === id)
		if (!foundItem) return
		quotation.items = [
			...quotation.items,
			{
				...foundItem,
				id: crypto.randomUUID()
			}
		]
	}

	function move(currentIndex: number, nextIndex: number) {
		const newItems = [...quotation.items]
		newItems[currentIndex] = quotation.items[nextIndex]
		newItems[nextIndex] = quotation.items[currentIndex]
		quotation.items = newItems
	}

	function handleMoveUpItem(index: number) {
		if (index > 0) {
			move(index, index - 1)
		}
	}

	function handleMoveDownItem(index: number) {
		if (index < quotation.items.length - 1) {
			move(index, index + 1)
		}
	}

	function onCloseCreateEditItemDialog() {
		showCreateEditModal.value = false
		selectedItemId.value = null
	}

	function onOpenCreateEditItemDialog() {
		showCreateEditModal.value = true
		selectedItemId.value = null
	}

	const context: QuotationContext = {
		quotation,
		showCreateEditModal,
		showCreditOption,
		showCustomerPickDialog,
		selectedItemId,
		pending,
		onAddItem: handleAddItem,
		onDeleteItem: handleDeleteItem,
		onEditItem: handleEditItem,
		onDuplicateItem: handleDuplicateItem,
		onMoveUpItem: handleMoveUpItem,
		onMoveDownItem: handleMoveDownItem,
		onSelectItem,
		onCloseCreateEditItemDialog,
		onOpenCreateEditItemDialog,
		setCustomer
	}

	// $effect(() => {
	// 	const savedQuotation = localStorage.getItem(QUOTATIONS_KEY)
	// 	console.log(savedQuotation)
	// 	if (savedQuotation) {
	// 		const parsedQuotation = JSON.parse(savedQuotation) as CreateQuotationClient
	// 		quotation.credit = parsedQuotation.credit
	// 		quotation.deadline = parsedQuotation.deadline
	// 		quotation.includeIgv = parsedQuotation.includeIgv
	// 		quotation.isPaymentPending = parsedQuotation.isPaymentPending
	// 		quotation.items = parsedQuotation.items
	// 		quotation.customer = parsedQuotation.customer
	// 		quotation.customerId = parsedQuotation.customerId
	// 	}
	// })
	setContext(QUOTATION_KEY, context)
}

export function getQuotationContext() {
	return getContext(QUOTATION_KEY) as QuotationContext
}
