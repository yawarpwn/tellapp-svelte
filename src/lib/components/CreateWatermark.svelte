<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import 'filepond/dist/filepond.css'
	import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
	import type { FilePond as FilepondType } from 'filepond'
	import * as FilePond from 'filepond'
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
	import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
	import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
	import { PlusCircleIcon } from 'lucide-svelte'

	let pond: FilepondType
	function uploadFile(inputEl: HTMLInputElement) {
		// Registrar plugins
		FilePond.registerPlugin(
			FilePondPluginImagePreview,
			FilePondPluginImageTransform,
			FilePondPluginImageEdit
		)
		pond = FilePond.create(inputEl, {
			// Otros ajustes
			allowMultiple: true
		})
	}

	let open = $state(false)

	function handleUploadImage() {
		const files = pond.getFiles()
		files.forEach((file) => {
			console.log(file.file)
		})
		// console.log(pond.getFiles())
	}
	// Configurar FilePond
</script>

<button onclick={() => (open = true)} class="btn btn-primary">
	<PlusCircleIcon class="size-4" />
	<span class="hidden md:block"> Agregar </span>
</button>
<Dialog bind:open>
	<div>
		<input use:uploadFile type="file" />
		<div class="flex justify-between gap-2">
			<button onclick={() => (open = false)} class="btn">Cancelar</button>
			<button onclick={handleUploadImage} class="btn btn-primary">Crear</button>
		</div>
	</div>
</Dialog>

<style global>
</style>
