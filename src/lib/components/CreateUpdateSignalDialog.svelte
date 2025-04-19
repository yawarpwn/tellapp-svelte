<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import type { FilePond } from 'filepond'
	import { enhance } from '$app/forms'
	import { Loader2Icon, XIcon } from 'lucide-svelte'
	import type { Signal, SignalCategory } from '$lib/types'
	import UploadFile from './UploadFile.svelte'
	import { toast } from 'svelte-sonner'
	import { goto } from '$app/navigation'

	type Props = {
		open: boolean
		signalCategories: SignalCategory[]
		signalToEdit?: Signal
		closeModal: () => void
	}

	let { open = $bindable(false), signalCategories, signalToEdit, closeModal }: Props = $props()
	let showImage = $state(Boolean(signalToEdit?.url))

	let pond = $state<FilePond | null>(null)

	let loading = $state(false)
</script>

<Dialog bind:open onOpenChange={closeModal}>
	<form
		method="POST"
		action={signalToEdit ? '?/update' : '?/create'}
		class="flex flex-col gap-2"
		enctype="multipart/form-data"
		use:enhance={({ formData }) => {
			loading = true
			if (pond && pond.getFile()) {
				const file = pond.getFile()
				formData.append('file', file.file)
			}

			return async ({ update, result }) => {
				if (result.type === 'failure') {
					loading = false
					toast.error('Algo salio mal')
					return
				}

				await update({ reset: false })
				open = false
				loading = false
			}
		}}
	>
		{#if showImage}
			<div class="bg-base-content relative overflow-hidden rounded-md border p-4">
				<button
					class="bg-base-300 hover:bg-base-100 absolute top-1 right-1 z-10 cursor-pointer rounded-full p-1"
					onclick={() => {
						showImage = false
					}}
					type="button"
				>
					<XIcon size={16} />
				</button>
				<div class="relative min-h-[400px] border pb-[56.25%]">
					<img
						class="absolute inset-0 h-full w-full object-contain"
						src={signalToEdit?.url}
						alt="Imaen para editar"
					/>
				</div>
			</div>
		{:else}
			<UploadFile bind:instance={pond} name="files[]" />
		{/if}
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Titulo</legend>
			<input
				required
				defaultvalue={signalToEdit?.title ?? ''}
				disabled={loading}
				name="title"
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
