<script lang="ts">
	import {
		AppWindowMacIcon,
		Loader2Icon,
		SearchIcon,
		UsersIcon,
		UsersRoundIcon,
		XIcon
	} from 'lucide-svelte'
	import { toast } from 'svelte-sonner'
	import { getQuotationContext } from '$lib/contexts/quotation.svelte'
	import type { Customer } from '$lib/types'

	const { store, resetCustomer, setCustomer } = getQuotationContext()

	type Props = {
		onSearchCustomer: (
			customer: {
				name: string
				ruc: string
				address?: string
				isRegular: boolean
			},
			id?: string
		) => void

		ruc?: string
	}
	const { onSearchCustomer, ruc }: Props = $props()

	async function handleSubmit(ev: SubmitEvent) {
		ev.preventDefault()
		const formData = new FormData(ev.currentTarget as HTMLFormElement)
		const ruc = formData.get('ruc') as string

		if (ruc === '') {
			resetCustomer()
			return
		}

		// Válida si el ruc es de 11 digitos
		if (ruc.length !== 11) {
			toast('Ruc inválido')
			return
		}

		store.pending = true
		try {
			const res = await fetch(`/api/search-customer/${ruc}`)
			const data = (await res.json()) as { customer: Customer }
			onSearchCustomer(data.customer, data.customer?.id)
			toast.success(`${ruc}`, {
				description: data.customer.name
			})
		} catch (error) {
			toast.error(`${ruc}`, {
				description: 'Ruc NO encontrado en base de datos'
			})
			setCustomer(
				{
					name: '',
					ruc: ruc,
					address: '',
					isRegular: false
				},
				undefined
			)
		} finally {
			store.pending = false
		}
	}
</script>

<form onsubmit={handleSubmit} class="col-span-12 grid gap-1 lg:col-span-6">
	<label class="label text-sm" for="ruc"> Ruc </label>
	<div class="input w-full">
		<SearchIcon class="h-[1.2em] opacity-50" />
		<input
			id="ruc"
			name="ruc"
			disabled={store.pending}
			type="search"
			class="grow"
			value={store.quotation?.customer?.ruc || ''}
			placeholder="20610555536"
		/>
		<button
			disabled={store.pending}
			type="button"
			onclick={resetCustomer}
			class="bg-base-200 absolute right-1 z-10 cursor-pointer rounded-full p-1.5 disabled:opacity-50"
		>
			{#if store.pending}
				<Loader2Icon class="size-3 animate-spin opacity-50" />
			{:else}
				<XIcon class="size-3 opacity-50 hover:opacity-100" />
			{/if}
		</button>
	</div>
</form>
