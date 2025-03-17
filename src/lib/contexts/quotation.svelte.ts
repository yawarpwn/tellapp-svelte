import { getContext, setContext } from 'svelte'
import type { CreateQuotationClient, UpdateQuotationClient } from '$lib/types'

const quotationKey = Symbol('quotation')

type QuotationContext = {
	quotation: CreateQuotationClient | UpdateQuotationClient
	handleAddItem: () => void
	setCustomer: () => void
	handleEditItem: () => void
	handleDeleteItem: () => void
	handleDuplicateItem: () => void
	handleMoveUpItem: () => void
	handleMoveDownItem: () => void
	onSelectItem: () => void
	handleCustomerPick: () => void
	pending: boolean
	showCustomerPickDialog: boolean
	showCreditOption: boolean
	showCreateEditModal: boolean
	selectedItemId: string | null
}

export function setQuotationContext(context: CreateQuotationClient | UpdateQuotationClient) {
	setContext(quotationKey, context)
}

export function getQuotationContext() {
	return getContext(quotationKey) as QuotationContext
}
