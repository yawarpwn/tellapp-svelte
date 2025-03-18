<script lang="ts">
	import type { Customer } from '$lib/types'
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import CustomerRestults from './CustomerRestults.svelte'

	type Props = {
		customersPromise: Promise<Customer[]>
		showModal: boolean
		setCustomer: (
			_customer: Pick<Customer, 'name' | 'ruc' | 'address' | 'isRegular'>,
			_customerId?: string
		) => void
	}

	let { customersPromise, setCustomer, showModal = $bindable() }: Props = $props()

	function closeModal() {
		showModal = false
	}
</script>

<Dialog bind:open={showModal}>
	<div class="flex max-h-[90svh] flex-col gap-4">
		{#await customersPromise}
			<div class="skeleton h-12"></div>
			<div class="flex flex-col gap-2">
				{#each { length: 20 }, rank}
					<div class="skeleton h-10"></div>
				{/each}
			</div>
		{:then customers}
			<CustomerRestults {closeModal} {customers} {setCustomer} />
		{/await}
	</div>
</Dialog>
