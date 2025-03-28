<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import 'filepond/dist/filepond.css'
	import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
	import type { FilePond as FilepondType } from 'filepond'
	import * as FilePond from 'filepond'
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
	// import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
	// import FilePondPluginImageResize from 'filepond-plugin-image-resize'
	// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
	// import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
	// import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
	// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
	import { Loader2Icon, LoaderIcon, PlusCircleIcon } from 'lucide-svelte'
	import { goto } from '$app/navigation'

	type Props = {
		loading: boolean
	}
	let { loading = $bindable() }: Props = $props()

	let pond: FilepondType
	function uploadFile(inputEl: HTMLInputElement) {
		// Registrar plugins
		FilePond.registerPlugin(FilePondPluginImagePreview)
		pond = FilePond.create(inputEl, {
			// Otros ajustes
			allowMultiple: true,
			labelIdle:
				'Arrastra y suelta las fotos aquí o <span class="filepond--label-action">Buscar</span>',
			credits: false
		})
	}

	let open = $state(false)

	async function handleUploadImage() {
		const formData = new FormData()
		const files = pond.getFiles()
		for (const file of files) {
			formData.append('files[]', file.file)
		}

		loading = true
		fetch('/api/upload-watermark', {
			method: 'POST',
			body: formData
		})
			.then((res) => {
				console.log(res)
				if (!res.ok) throw new Error('error en coneción')
				open = false
				return res.json()
			})
			.then((data) => {
				console.log(data)
				open = false
				goto('/watermarks', {
					invalidateAll: true
				})
			})
			.catch((err) => {
				console.log('error enviando a api')
				console.log(err)
			})
			.finally(() => {
				loading = false
			})
	}
	// Configurar FilePond
</script>

<button onclick={() => (open = true)} class="btn btn-primary btn-sm">
	<PlusCircleIcon class="size-4" />
	<span class="hidden md:block"> Agregar </span>
</button>
<Dialog bind:open>
	<div class="flex h-[90svh] flex-col gap-4">
		<div class="h-full flex-1 overflow-y-auto">
			<input use:uploadFile type="file" accept="image/png, image/jpeg, image/gif, image/webp" />
		</div>
		<div class="flex justify-between gap-2">
			<button disabled={loading} onclick={() => (open = false)} class="btn">Cancelar</button>
			<button disabled={loading} onclick={handleUploadImage} class="btn btn-primary"
				>Crear
				{#if loading}<Loader2Icon class="size-4 animate-spin" />{/if}
			</button>
		</div>
	</div>
</Dialog>

<style global>
</style>
