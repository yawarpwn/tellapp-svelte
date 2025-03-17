// stores.js

type Quo = {
	number: number
	items: Array<{ id: string; name: string }>
}
const INITIAL_STATE = {
	number: 100,
	items: []
}

function useQuotation(initialState: any) {
	const quotation = $state<Quo>(initialState)
	let showModal = $state(false)

	const addItem = (item: any) => {
		quotation.items.push(item)
	}

	const deleteItem = () => {
		quotation.items.pop()
	}

	const openModal = () => {
		showModal = true
	}

	return {
		quotation,

		get showModal() {
			return showModal
		},
		set showModal(value: boolean) {
			showModal = value
		},
		addItem,
		openModal,
		deleteItem
	}
}

export const quotationStore = useQuotation(INITIAL_STATE)
