<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { Loader2Icon, SearchIcon, XIcon } from 'lucide-svelte'
	import type { Agency, CreateAgency, Customer } from '$lib/types'
	import { toast } from 'svelte-sonner'

	type Props = {
		open: boolean
		agencyToEdit?: Agency
		closeModal: () => void
	}

	let { open = $bindable(false), agencyToEdit, closeModal }: Props = $props()

	const agency = $state<Agency | CreateAgency>(
		agencyToEdit || {
			ruc: '',
			name: '',
			phone: '',
			address: ''
		}
	)

	function isEditMode(label: Agency | CreateAgency): label is Agency {
		return 'id' in label
	}

	let loading = $state(false)

	async function searchCustomer() {
		loading = true
		try {
			const res = await fetch(`/api/search-customer/${agency.ruc}`)
			const data = (await res.json()) as { customer: Customer }

			agency.name = data.customer.name
			agency.ruc = data.customer.ruc

			toast.success(`${agency.ruc}`, {
				description: data.customer.name
			})
		} catch (error) {
			toast.error(`${agency.ruc}`, {
				description: 'Ruc NO encontrado en base de datos'
			})
		} finally {
			loading = false
		}
	}
</script>

<Dialog bind:open onOpenChange={closeModal}>
	<form
		method="POST"
		action={agencyToEdit ? '?/update' : '?/create'}
		class="flex flex-col gap-2"
		use:enhance={() => {
			loading = true

			return async ({ update, result }) => {
				await update({ reset: false })
				loading = false
				if (result.type === 'success') {
					open = false
				}
			}
		}}
	>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Ruc</legend>
			<label class="input w-full">
				<input
					required
					bind:value={agency.ruc}
					disabled={loading}
					name="ruc"
					type="number"
					minlength="11"
					maxlength="11"
					class=""
					placeholder="46226410"
					onkeydown={(ev) => {
						const keyPressed = ev.key
						if (keyPressed === 'Enter') {
							searchCustomer()
						}
					}}
				/>
				<button
					onclick={searchCustomer}
					name="ruc"
					value={agency.ruc}
					type="button"
					class="btn btn-sm absolute right-1"
				>
					<SearchIcon class="size-4" />
				</button>
			</label>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Razon Social</legend>
			<input
				required
				bind:value={agency.name}
				disabled={loading}
				name="name"
				type="text"
				class="input w-full"
				placeholder="Juan Perez"
			/>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Dirección</legend>
			<textarea
				required
				bind:value={agency.address}
				disabled={loading}
				name="address"
				class="textarea w-full resize-none"
				placeholder="Atencion Juan Pereze con dni:46226480"
			></textarea>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Telefono</legend>
			<input
				bind:value={agency.phone}
				disabled={loading}
				name="phone"
				type="number"
				class="input w-full"
				placeholder="999999999"
			/>
		</fieldset>
		<input type="hidden" name="id" value={isEditMode(agency) ? agency?.id : undefined} />
		<footer class="mt-4 flex justify-between">
			<button disabled={loading} onclick={closeModal} class="btn">Cancelar</button>
			<button disabled={loading} class="btn btn-primary" type="submit">
				{agencyToEdit ? 'Actualizar' : 'Crear'}
				{#if loading}
					<Loader2Icon class="animate-spin" />
				{/if}
			</button>
		</footer>
	</form>
</Dialog>
