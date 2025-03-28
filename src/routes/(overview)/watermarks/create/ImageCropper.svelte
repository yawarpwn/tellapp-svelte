<script>
	import { onMount, afterUpdate } from 'svelte'
	import Cropper from 'cropperjs'
	import 'cropperjs/dist/cropper.css'

	// Props
	export let src = ''
	export let aspectRatio = 16 / 9
	export let cropBoxResizable = true
	export let viewMode = 1 // 0, 1, 2 o 3
	export let guides = true
	export let autoCropArea = 0.8

	// Referencias
	let imageElement
	let cropperInstance
	let previewElement
	let resultBlob

	// Inicializar Cropper cuando el componente está montado o la src cambia
	onMount(initCropper)
	afterUpdate(initCropper)

	function initCropper() {
		if (cropperInstance) {
			cropperInstance.destroy()
		}

		if (imageElement && src) {
			cropperInstance = new Cropper(imageElement, {
				aspectRatio,
				viewMode,
				guides,
				autoCropArea,
				cropBoxResizable,
				ready() {
					updatePreview()
				},
				crop() {
					updatePreview()
				}
			})
		}
	}

	function updatePreview() {
		if (cropperInstance && previewElement) {
			const canvas = cropperInstance.getCroppedCanvas()
			previewElement.innerHTML = ''
			previewElement.appendChild(canvas)

			// Convertir a Blob para posible subida
			canvas.toBlob((blob) => {
				resultBlob = blob
			})
		}
	}

	function getCroppedImage() {
		return resultBlob
	}

	// Limpiar al desmontar
	onDestroy(() => {
		if (cropperInstance) {
			cropperInstance.destroy()
		}
	})
</script>

<div class="cropper-container">
	<div class="image-container">
		{#if src}
			<img
				bind:this={imageElement}
				{src}
				alt="Imagen a recortar"
				style="max-width: 100%; max-height: 70vh"
			/>
		{:else}
			<p>Selecciona una imagen para recortar</p>
		{/if}
	</div>

	{#if src}
		<div class="preview-container">
			<h3>Vista previa del recorte:</h3>
			<div bind:this={previewElement} class="preview" />
		</div>
	{/if}
</div>

<style>
	.cropper-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 100%;
	}

	.image-container {
		margin-bottom: 1rem;
	}

	.preview-container {
		margin-top: 1rem;
	}

	.preview {
		width: 200px;
		height: calc(200px / 500);
		overflow: hidden;
		border: 1px solid #ccc;
	}
</style>
