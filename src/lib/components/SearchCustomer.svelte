<script lang="ts">
	import { Loader2Icon, SearchIcon } from 'lucide-svelte'
	import { toast } from 'svelte-sonner'

	type Props = {
		onSearchCustomer: (customer: {
			name: string
			ruc: string
			address?: string
			isRegular: boolean
		}) => void

		ruc?: string
	}
	const { onSearchCustomer, ruc }: Props = $props()

	let pending = $state(false)

	async function handleSubmit(ev: SubmitEvent) {
		ev.preventDefault()
		const formData = new FormData(ev.currentTarget as HTMLFormElement)
		const ruc = formData.get('ruc') as string

		// Válida si el ruc es de 11 digitos
		if (ruc.length !== 11) {
			toast('Ruc inválido')
			return
		}

		pending = true
		const res = await fetch(`/api/search-customer/${ruc}`)
		const data = await res.json()

		if (!data) {
			toast('Cliente no encontrado')

			pending = false
			return
		}
		pending = false
		onSearchCustomer(data)
	}
</script>

<form onsubmit={handleSubmit} class="col-span-8 grid gap-2 lg:col-span-6">
	<label class="label" for="ruc"> Ruc </label>
	<div class="relative">
		<input
			id="ruc"
			name="ruc"
			class="input w-full"
			defaultValue={ruc ?? ''}
			placeholder="20610555536"
		/>
		<button
			disabled={pending}
			type="submit"
			class="hover:bg-base-300 absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-md p-1"
		>
			{#if pending}
				<Loader2Icon class="animate-spin" />
			{:else}
				<SearchIcon />
			{/if}
		</button>
	</div>
</form>
