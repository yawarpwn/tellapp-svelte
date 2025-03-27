<script lang="ts">
	import 'filepond/dist/filepond.css'
	import '@pqina/pintura/pintura.css'
	import '@pqina/pintura/'
	import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css'
	import type { FilePond as FilepondType } from 'filepond'
	import * as FilePond from 'filepond'
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
	import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
	import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor'
	import { Loader2Icon, LoaderIcon, PlusCircleIcon } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import {
		openEditor,
		processImage,
		createDefaultImageReader,
		createDefaultImageWriter,
		createDefaultImageOrienter,

		// Only needed if loading legacy image editor data
		legacyDataToImageState,

		// Import the editor default configuration
		getEditorDefaults,
		getCropperDefaults
	} from '@pqina/pintura'

	type Props = {
		loading: boolean
	}
	let { loading = $bindable() }: Props = $props()

	let pond: FilepondType
	function uploadFile(inputEl: HTMLInputElement) {
		// Registrar plugins
		FilePond.registerPlugin(
			FilePondPluginFileValidateType,
			FilePondPluginImageEditor,
			FilePondPluginFilePoster
		)
		pond = FilePond.create(inputEl, {
			// FilePond generic properties
			allowMultiple: true,

			// FilePond Image Editor plugin properties
			imageEditor: {
				// Maps legacy data objects to new imageState objects (optional)
				legacyDataToImageState: legacyDataToImageState,
				// Used to create the editor (required)
				createEditor: openEditor,

				// Used for reading the image data. See JavaScript installation for details on the `imageReader` property (required)
				imageReader: [
					createDefaultImageReader,
					{
						// createDefaultImageReader options here
					}
				],

				// Required when generating a preview thumbnail and/or output image
				imageWriter: [createDefaultImageWriter],

				// Used to create poster and output images, runs an invisible "headless" editor instance
				imageProcessor: processImage,

				// Pintura Image Editor options
				editorOptions: {
					// Pass the editor default configuration options
					...getCropperDefaults()

					// This will set a square crop aspect ratio
				}
			}
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

<div class="">
	<div class="">
		<input
			use:uploadFile
			type="file"
			accept="image/png, image/jpeg, image/gif, image/webp"
			class="filepond"
		/>
	</div>
	<div class="flex justify-between gap-2">
		<button disabled={loading} onclick={() => (open = false)} class="btn">Cancelar</button>
		<button disabled={loading} onclick={handleUploadImage} class="btn btn-primary"
			>Crear
			{#if loading}<Loader2Icon class="size-4 animate-spin" />{/if}
		</button>
	</div>
</div>

<style global>
</style>
