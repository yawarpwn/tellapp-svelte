<script lang="ts">
	import 'filepond/dist/filepond.css'
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
	// Import the Image EXIF Orientation and Image Preview plugins
	// Note: These need to be installed separately
	// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
	import * as Filepond from 'filepond'
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
	import { onMount } from 'svelte'

	type Props = {
		name?: string
		instance?: Filepond.FilePond | null
	} & Filepond.FilePondOptions

	const isSupported = Filepond.supported()

	// Register the plugins
	Filepond.registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
	let root: HTMLInputElement

	let { name, instance = $bindable(), ...restProps }: Props = $props()

	const id = $props.id()

	onMount(() => {
		if (!isSupported) return
		instance = Filepond.create(root, {
			credits: false,
			labelIdle:
				'Arrastra y suelta las fotos aquí o <span class="filepond--label-action">Buscar</span>',
			...restProps
		})
	})

	$effect(() => {
		return () => {
			if (!instance) return
			instance.destroy()
			instance = undefined
		}
	})
</script>

<div class="filepond--wrapper">
	<input
		type="file"
		bind:this={root}
		{id}
		{name}
		accept="image/png, image/jpeg, image/gif, image/webp"
		multiple={false}
		required
	/>
</div>
