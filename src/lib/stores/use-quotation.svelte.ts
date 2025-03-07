import type { CreateQuotationClient } from '$lib/types'

const quotation = $state<CreateQuotationClient>({
	credit: undefined,
	deadline: 1,
	isPaymentPending: false,
	customerId: undefined,
	includeIgv: true,
	items: [
		{
			id: 'e0313080',
			description: 'default desc',
			qty: 1,
			price: 10,
			cost: 100,
			unitSize: 'und'
		}
	],
	customer: {
		address: '',
		name: '',
		ruc: '',
		isRegular: true
	}
})

let showCreateEditModal = $state(false)
let showCreditOption = $state(false)
let selectedItemId = $state<null | string>(null)
const selectedItem = $derived(quotation.items.find((i) => i.id === selectedItemId))
let pending = $state(false)

function handleSelectItem() {}

function onSelectItem(id: string) {
	selectedItemId = id
	showCreateEditModal = true
}

export function useQuotation() {
	$effect(() => {
		console.info('effect')
	})
	return {
		quotation,
		showCreateEditModal,
		showCreditOption,
		pending,
		onSelectItem
	}
}
