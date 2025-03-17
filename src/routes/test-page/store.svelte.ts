// stores.js

import { getContext, setContext } from 'svelte'

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

const QUO_KEY = Symbol('quo')

export function setQuoContext(initialState?: Quo) {
	const quotation = $state<Quo>(initialState || INITIAL_STATE)
	let showModal = $state({
		value: false
	})
	let selectedItemId = $state({ value: null })

	const addItem = (item: any) => {
		quotation.items.push(item)
	}

	const openModal = () => {
		showModal.value = true
	}

	const onSelectItem = (id: string) => {
		selectedItemId.value = id
	}

	setContext(QUO_KEY, {
		quotation,
		showModal,
		openModal,
		addItem,
		selectedItemId,
		onSelectItem
	})
}

type QuoContext = {
	quotation: Quo
	addItem: (item: any) => void
}
export function getQuoContext() {
	return getContext(QUO_KEY) as QuoContext
}

export const quotationStore = useQuotation(INITIAL_STATE)
