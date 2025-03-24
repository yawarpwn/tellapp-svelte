<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { Loader2Icon, SearchIcon } from 'lucide-svelte'
	import type { Agency, LabelType, CreateLabel } from '$lib/types'
	import AgenciesCombobox from './AgenciesCombobox.svelte'

	type Props = {
		open: boolean
		labelToEdit?: LabelType
		agencies: Agency[]
		closeModal: () => void
	}

	let { open = $bindable(false), labelToEdit, closeModal, agencies }: Props = $props()

	const label = $state<LabelType | CreateLabel>(
		labelToEdit || {
			dniRuc: '',
			recipient: '',
			destination: '',
			observations: '',
			phone: '',
			agencyId: '1307f184-318e-4292-b603-23dc66e7f03e',
			address: ''
		}
	)

	function isEditLabel(label: LabelType | CreateLabel): label is LabelType {
		return 'id' in label
	}

	function setLabel() {}

	let loading = $state(false)
</script>

<Dialog bind:open onOpenChange={closeModal}>
	<form
		method="POST"
		action={label ? '?/update' : '?/create'}
		class="flex flex-col gap-2"
		use:enhance={() => {
			loading = true

			return async ({ update }) => {
				await update({ reset: false })
				open = false
				loading = false
			}
		}}
	>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Dni/Ruc</legend>
			<label class="input w-full">
				<SearchIcon class="h-[1em] opacity-50" />
				<input
					bind:value={label.dniRuc}
					disabled={loading}
					name="dniRuc"
					type="number"
					class=""
					placeholder="46226410"
				/>
			</label>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Destinatario</legend>
			<input
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
				bind:value={label.destination}
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
				name="link"
				type="text"
				class="input w-full"
				placeholder="https://tellsenales.com/products/example-product"
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
		<!-- <select -->
		<!-- 	disabled={loading} -->
		<!-- 	value={labelToEdit?.categoryId ?? 'default'} -->
		<!-- 	name="categoryId" -->
		<!-- 	class="select w-full" -->
		<!-- > -->
		<!-- 	<option value="default" disabled selected>Selecionar Categoria</option> -->
		<!-- </select> -->
		<fieldset class="fieldset relative">
			<legend class="fieldset-legend text-base-content/50">Agencia Sugerida</legend>
			<AgenciesCombobox
				bind:agencyId={label.agencyId}
				agencyName={isEditLabel(label) ? label.agency.name : undefined}
				{agencies}
			/>
		</fieldset>
		<input type="hidden" name="id" value={isEditLabel(label) ? label?.id : undefined} />
		<footer class="mt-4 flex justify-between">
			<button disabled={loading} onclick={() => (open = false)} class="btn">Cancelar</button>
			<button disabled={loading} class="btn btn-primary" type="submit">
				{label ? 'Actualizar' : 'Crear'}
				{#if loading}
					<Loader2Icon class="animate-spin" />
				{/if}
			</button>
		</footer>
	</form>
</Dialog>
