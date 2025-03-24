import type {
	CreateQuotationClient,
	Customer,
	QuotationClient,
	QuotationItem,
	UpdateQuotationClient
} from '$lib/types'
import { writable } from 'svelte/store'

export const quotation = writable<CreateQuotationClient>({
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
})

export function onAddItem(item: QuotationItem) {
	quotation.update((quo) => {
		quo.items.push(item)
		return quo
	})
}

export function onEditItem(item: QuotationItem) {
	quotation.update((quo) => {
		quo.items = quo.items.map((i) => {
			if (i.id === item.id) return item
			return i
		})
		return quo
	})
}

export function onDeleteItem(id: string) {
	quotation.update((quo) => {
		quo.items = quo.items.filter((item) => item.id !== id)
		return quo
	})
}

export function onDuplicateItem(id: string) {
	quotation.update((quo) => {
		const foundItem = quo.items.find((item) => item.id === id)
		if (!foundItem) return quo
		onAddItem({
			...foundItem,
			id: crypto.randomUUID()
		})

		return quo
	})
}

function move(currentIndex: number, nextIndex: number, quotation: QuotationClient) {
	const newItems = [...quotation.items]
	newItems[currentIndex] = quotation.items[nextIndex]
	newItems[nextIndex] = quotation.items[currentIndex]
	quotation.items = newItems
}

// function handleMoveUpItem(index: number) {
// 	if (index > 0) {
// 		move(index, index - 1)
// 	}
// }
//
// function handleMoveDownItem(index: number) {
// 	if (index < quotation.items.length - 1) {
// 		move(index, index + 1)
// 	}
// }
