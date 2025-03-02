<script lang="ts">
	import { XIcon } from 'lucide-svelte'
	import type { Customer } from '$lib/types'

	type Props = {
		customers: Customer[]
		onCustomerPick: (customer: Pick<Customer, 'id' | 'name' | 'ruc' | 'address'>) => void
	}

	let { customers, onCustomerPick }: Props = $props()
	let modalRef: HTMLDialogElement

	let searchTerm = $state('')

	const filteredCustomers = $derived(
		customers.filter((customer) =>
			customer.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
		)
	)
</script>

<button
	class="btn"
	onclick={() => {
		modalRef.showModal()
	}}>Clientes</button
>
<dialog bind:this={modalRef} class="modal">
	<form method="dialog" class="modal-backdrop">
		<button> cerrar </button>
	</form>
	<div class="modal-box relative max-h-[90dvh]">
		<form
			onsubmit={(ev) => {
				ev.preventDefault()
			}}
		>
			<input class="input" bind:value={searchTerm} type="search" />
			<button>Buscar</button>
		</form>
		<ul>
			{#each filteredCustomers as { name, address, id, ruc }}
				<li>
					>
					<button
						class="btn"
						onclick={() => {
							modalRef.close()
							onCustomerPick({ id, name, address, ruc })
						}}
					>
						{name}
					</button>
				</li>
			{/each}
		</ul>
		<form method="dialog" class="absolute top-2 right-2">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn btn-xs btn-circle">
				<XIcon />
			</button>
		</form>
	</div>
</dialog>
