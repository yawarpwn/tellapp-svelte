<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import type { FilePond } from 'filepond'
	import { enhance } from '$app/forms'
	import { Loader2Icon } from 'lucide-svelte'
	import type { Signal, SignalCategory } from '$lib/types'
	import UploadFile from './UploadFile.svelte'
	import { toast } from 'svelte-sonner'

	type Props = {
		open: boolean
		signalCategories: SignalCategory[]
		signalToEdit?: Signal
		closeModal: () => void
	}

	let { open = $bindable(false), signalCategories, signalToEdit, closeModal }: Props = $props()

	let pond = $state<FilePond | null>(null)

	let loading = $state(false)
</script>

<Dialog bind:open onOpenChange={closeModal}>
	<form
		method="POST"
		action={signalToEdit ? '?/update' : '?/create'}
		class="flex flex-col gap-2"
		enctype="multipart/form-data"
		use:enhance={({ formData, submitter, action, controller }) => {
			if (!pond) {
				toast.error('No se ha cargado ninguna imagen')
				return
			}

			console.log({ action, controller })
			const file = pond.getFile()
			formData.append('file', file.file)

			return async ({ update, result }) => {
				if (result.type === 'success') {
					await update({ reset: false })
					open = false
				}

				loading = false
			}
		}}
	>
		<UploadFile bind:instance={pond} name="files[]" />
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Titulo</legend>
			<input
				required
				defaultvalue={signalToEdit?.title ?? ''}
				disabled={loading}
				name="unitSize"
				type="text"
				class="input w-full"
				placeholder="Señal hombres trabajando"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Código</legend>
			<input
				required
				defaultvalue={signalToEdit?.code ?? ''}
				disabled={loading}
				name="code"
				maxlength="12"
				minlength="4"
				type="text"
				class="input w-full"
				placeholder="P-47"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Descripción</legend>
			<textarea
				defaultvalue={signalToEdit?.description ?? ''}
				disabled={loading}
				name="description"
				required
				class="textarea min-h-[150px] w-full resize-none md:min-h-[100px]"
				placeholder="Descripción se la señál..."
			></textarea>
		</fieldset>
		<select
			required
			disabled={loading}
			value={signalToEdit?.categoryId ?? 'default'}
			name="categoryId"
			class="select w-full"
		>
			<option value="default" disabled selected>Selecionar Categoria</option>
			{#each signalCategories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>
		<input type="hidden" name="id" value={signalToEdit?.id ?? undefined} />
		<footer class="mt-4 flex justify-between">
			<button disabled={loading} onclick={closeModal} class="btn">Cancelar</button>
			<button disabled={loading} class="btn btn-primary" type="submit">
				{signalToEdit ? 'Actualizar' : 'Crear'}
				{#if loading}
					<Loader2Icon class="animate-spin" />
				{/if}
			</button>
		</footer>
	</form>
</Dialog>
