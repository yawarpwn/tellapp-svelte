<script lang="ts">
	import { CheckIcon, OctagonAlertIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import type { Customer } from '$lib/types'
	import { getQuotationContext } from '$lib/contexts/quotation.svelte'

	type Props = {
		customers: Customer[]
		closeModal: () => void
		setCustomer: (
			_customer: Pick<Customer, 'name' | 'ruc' | 'address' | 'isRegular'>,
			_customerId?: string
		) => void
	}
	const { customers, setCustomer, closeModal }: Props = $props()

	const { store } = getQuotationContext()

	let searchInputEl: HTMLInputElement
	let searchTerm = $state('')
	const filteredCustomers = $derived(
		customers.filter((customer) =>
			customer.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
		)
	)
</script>

<header class="">
	<form
		class=""
		onsubmit={(ev) => {
			ev.preventDefault()
		}}
	>
		<label class="input w-full">
			<SearchIcon class="size-4 opacity-50" />
			<input
				placeholder="Buscar cliente..."
				bind:this={searchInputEl}
				tabindex="0"
				class="w-full"
				bind:value={searchTerm}
				type="search"
			/>
			{#if searchTerm}
				<button
					onclick={() => {
						searchTerm = ''
					}}
					class="bg-base-content/10 hover:bg-base-content/30 cursor-pointer rounded-full p-1"
				>
					<XIcon class="size-3" />
				</button>
			{/if}
		</label>
	</form>
</header>
<ul class="flex flex-col gap-1 overflow-y-scroll">
	{#each filteredCustomers as { name, address, id, ruc, isRegular }}
		<li>
			<button
				class={[
					'bg-base-200 hover:bg-base-300 flex w-full cursor-pointer items-center  justify-between gap-2 rounded-md px-2 py-2 text-left',
					store.quotation.customerId === id ? 'bg-base-300' : ''
				]}
				onclick={() => {
					setCustomer({ name, address, ruc, isRegular }, id)
					closeModal()
				}}
			>
				{name}
				{#if store.quotation.customerId === id}
					<CheckIcon class="text-primary size-5" />
				{/if}
			</button>
		</li>
	{:else}
		<li class="h-[200px] flex gap-2 items-center justify-center">
			<OctagonAlertIcon />
			Sin results
		</li>
	{/each}
</ul>
