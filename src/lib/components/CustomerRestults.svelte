<script lang="ts">
	import { OctagonAlertIcon, SearchIcon } from 'lucide-svelte'
	import type { Customer } from '$lib/types'

	type Props = {
		customers: Customer[]
		closeModal: () => void
		setCustomer: (
			_customer: Pick<Customer, 'name' | 'ruc' | 'address' | 'isRegular'>,
			_customerId?: string
		) => void
	}
	const { customers, setCustomer, closeModal }: Props = $props()

	let searchInputEl: HTMLInputElement
	let searchTerm = $state('')
	const filteredCustomers = $derived(
		customers.filter((customer) =>
			customer.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
		)
	)

	$effect(() => {
		const id = setTimeout(() => {
			searchInputEl.focus()
		}, 100)
		return () => {
			clearTimeout(id)
		}
	})
</script>

<header class="">
	<form
		class=""
		onsubmit={(ev) => {
			ev.preventDefault()
		}}
	>
		<label class="relative">
			<input
				placeholder="Buscar cliente..."
				bind:this={searchInputEl}
				tabindex="0"
				class="input w-full"
				bind:value={searchTerm}
				type="search"
			/>
			<button tabindex="-1" class="absolute top-1/2 right-4 -translate-y-1/2">
				<SearchIcon />
			</button>
		</label>
	</form>
</header>
<ul class="flex flex-col gap-1 overflow-y-scroll">
	{#each filteredCustomers as { name, address, id, ruc, isRegular }}
		<li>
			<button
				class="bg-base-200 hover:bg-base-300 w-full cursor-pointer rounded-md px-2 py-2"
				onclick={() => {
					setCustomer({ name, address, ruc, isRegular }, id)
					closeModal()
				}}
			>
				{name}
			</button>
		</li>
	{:else}
		<li class="h-[200px] flex gap-2 items-center justify-center">
			<OctagonAlertIcon />
			Sin results
		</li>
	{/each}
</ul>
