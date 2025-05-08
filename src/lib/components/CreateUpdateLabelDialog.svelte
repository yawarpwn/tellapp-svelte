<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { Loader2Icon, SearchIcon, XIcon } from 'lucide-svelte'
	import type { Agency, LabelType, CreateLabel, Customer } from '$lib/types'
	import AgenciesCombobox from './AgenciesCombobox.svelte'
	import { toast } from 'svelte-sonner'

	type Props = {
		open: boolean
		labelToEdit?: LabelType
		agencies: Agency[]
		closeModal: () => void
	}

	let { open = $bindable(false), labelToEdit, closeModal, agencies }: Props = $props()
	let destinationRef: HTMLInputElement

	const label = $state<LabelType | CreateLabel>(
		labelToEdit || {
			dniRuc: '',
			recipient: '',
			destination: '',
			observations: '',
			phone: '',
			agencyId: undefined,
			address: ''
		}
	)

	function isEditLabel(label: LabelType | CreateLabel): label is LabelType {
		return 'id' in label
	}

	let loading = $state(false)

	async function searchCustomer() {
		loading = true
		try {
			const res = await fetch(`/api/search-customer/${label.dniRuc}`)
			const data = (await res.json()) as { customer: Customer }

			label.recipient = data.customer.name
			label.dniRuc = data.customer.ruc

			toast.success(`${label.dniRuc}`, {
				description: data.customer.name
			})
		} catch (error) {
			toast.error(`${label.dniRuc}`, {
				description: 'Ruc NO encontrado en base de datos'
			})
		} finally {
			loading = false
		}
	}

	let isValid = $derived.by(() => {
		return label.dniRuc.length === 8 || label.dniRuc.length === 11
	})
</script>

<Dialog bind:open onOpenChange={closeModal}>
	<form
		method="POST"
		action={labelToEdit ? '?/update' : '?/create'}
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
			<legend class="fieldset-legend text-base-content/50">Dni/Ruc</legend>
			<label class="input w-full">
				<input
					bind:value={label.dniRuc}
					disabled={loading}
					name="dniRuc"
					required
					type="text"
					minlength="8"
					maxlength="11"
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
					disabled={!isValid || loading}
					name="ruc"
					value={label.dniRuc}
					type="button"
					class="btn btn-sm absolute right-1"
				>
					<SearchIcon class="size-4" />
				</button>
			</label>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Destinatario</legend>
			<input
				required
				bind:value={label.recipient}
				disabled={loading}
				name="recipient"
				type="text"
				class="input w-full"
				placeholder="Juan Perez"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Destino</legend>
			<input
				required
				bind:this={destinationRef}
				bind:value={
					() => label.destination.toUpperCase(), (v) => (label.destination = v.toUpperCase())
				}
				disabled={loading}
				name="destination"
				type="text"
				class="input w-full"
				placeholder="Cusco - Cusco"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Telefono</legend>
			<input
				bind:value={label.phone}
				disabled={loading}
				name="phone"
				type="number"
				minlength="9"
				maxlength="9"
				class="input w-full"
				placeholder="999999999"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Observaciones</legend>
			<textarea
				bind:value={label.observations}
				disabled={loading}
				name="observations"
				class="textarea w-full resize-none"
				placeholder="Atencion Juan Pereze con dni:46226480"
			></textarea>
		</fieldset>
		<fieldset class="fieldset relative">
			<legend class="fieldset-legend text-base-content/50">Agencia Sugerida</legend>
			<AgenciesCombobox
				bind:agencyId={label.agencyId}
				agencyName={isEditLabel(label) ? label.agency?.name : undefined}
				{agencies}
			/>
		</fieldset>
		<input type="hidden" name="id" value={isEditLabel(label) ? label?.id : undefined} />
		<footer class="mt-4 flex justify-between">
			<button disabled={loading} onclick={closeModal} class="btn">Cancelar</button>
			<button disabled={loading} class="btn btn-primary" type="submit">
				{labelToEdit ? 'Actualizar' : 'Crear'}
				{#if loading}
					<Loader2Icon class="animate-spin" />
				{/if}
			</button>
		</footer>
	</form>
</Dialog>
