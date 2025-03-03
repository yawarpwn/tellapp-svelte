import type {
	CreateQuotationClient,
	Customer,
	QuotationClient,
	QuotationItem,
	UpdateQuotationClient
} from '$lib/types'

export const quotation: CreateQuotationClient = $state({
	credit: undefined,
	deadline: 1,
	isPaymentPending: false,
	customerId: undefined,
	includeIgv: true,
	items: [],
	customer: undefined
})

function handleUpdateQuotation(quo: UpdateQuotationClient) {
	quotation.credit = quo.credit
	quotation.deadline = quo.deadline || 1
	quotation.isPaymentPending = quo.isPaymentPending || false
	quotation.customerId = quo.customerId
	quotation.includeIgv = quo.includeIgv || true
	quotation.items = quo.items || []
	quotation.customer = quo.customer
}

function handleCustomerPick(customer: Pick<Customer, 'id' | 'name' | 'ruc' | 'address'>) {
	quotation.customer = {
		address: customer.address,
		id: customer.id,
		name: customer.name,
		ruc: customer.ruc,
		isRegular: true
	}
}

export function handleAddItem(item: QuotationItem) {
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

export {
	handleCustomerPick as onCustomerPick,
	handleEditItem as onEditItem,
	handleDeleteItem as onDeleteItem,
	handleDuplicateItem as onDuplicateItem,
	handleAddItem as onAddItem,
	handleUpdateQuotation as onUpdateQuotation
}
