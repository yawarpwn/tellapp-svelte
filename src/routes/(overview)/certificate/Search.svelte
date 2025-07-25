<script lang="ts">
	import type { CustomerFromService } from '$lib/types'
	import { SearchIcon, Loader2Icon } from 'lucide-svelte'

	let loading = $state(false)

	type Props = {
		onSearchCustomer: (data: CustomerFromService) => void
		dniRuc: string
	}
	const { onSearchCustomer, dniRuc }: Props = $props()

	async function handleSearch() {
		if (dniRuc.length < 8 || dniRuc.length > 11) return
		loading = true
		await new Promise((resolve) => setTimeout(resolve, 500))

		try {
			const res = await fetch(`/api/search-customer/${dniRuc}`)
			const data = (await res.json()) as { customer: CustomerFromService }
			loading = false

			onSearchCustomer({
				id: data.customer.id,
				name: data.customer.name,
				ruc: data.customer.ruc,
				address: data.customer.address,
				isRegular: data.customer.isRegular
			})
		} catch (error) {
			alert('Ruc NO encontrado en base de datos')
		}
	}
</script>

<button class="btn btn-sm cursor-pointer" onclick={handleSearch}>
	{#if loading}
		<Loader2Icon class="size-4 animate-spin" />
	{:else}
		<SearchIcon class="size-4" />
	{/if}
</button>
