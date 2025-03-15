<script lang="ts">
	import { Loader2Icon, SearchIcon } from 'lucide-svelte'
	import { toast } from 'svelte-sonner'

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

		async function promise() {
			pending = true
			const res = await fetch(`/api/search-customer/${ruc}`)
			return await res.json()
		}

		toast.promise(promise, {
			loading: 'Buscando cliente...',
			success: (data) => {
				onSearchCustomer(data.customer, data.customer?.id)
				pending = false
				return 'Cliente encontrado'
			},
			error: () => {
				pending = false
				onSearchCustomer(
					{
						name: '',
						ruc: '',
						address: '',
						isRegular: false
					},
					undefined
				)
				return `Ruc: ${ruc} no encontrado`
			}
		})
	}
</script>

<form onsubmit={handleSubmit} class="col-span-8 grid gap-2 lg:col-span-6">
	<label class="label" for="ruc"> Ruc </label>
	<div class="relative">
		<input
			id="ruc"
			name="ruc"
			disabled={pending}
			required
			minlength="11"
			maxlength="11"
			class="input w-full"
			defaultValue={ruc ?? ''}
			placeholder="20610555536"
		/>
		<button
			disabled={pending}
			type="submit"
			class="hover:bg-base-300 absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-md p-1 disabled:opacity-50"
		>
			<SearchIcon />
		</button>
	</div>
</form>
