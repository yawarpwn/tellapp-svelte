<script lang="ts">
	import { getContext, setContext } from 'svelte'

	type Quo = {}

	const INITIAL_QUO = {
		credit: undefined,
		deadline: 1,
		customerId: undefined,
		items: []
	}
	const quo = $state<Quo>(INITIAL_QUO)

	function addItem() {
		quo.items.push({
			id: crypto.randomUUID(),
			title: 'Tarea 1'
		})
	}

	function deleteItem() {
		quo.items.pop()
	}

	setContext('quo', { quo, addItem, deleteItem })

	const QUO_KEY = Symbol('quo')

	export function setQuotationContext(quo: Quo) {
		setContext(QUO_KEY, {
			quo: () => {
				return quo
			},
			deleteItem,
			addItem
		})
	}

	export function getQuotationContext() {
		return getContext<{
			quo: () => Quo
			addItem: () => void
			deleteItem: () => void
		}>(QUO_KEY)
	}
</script>
