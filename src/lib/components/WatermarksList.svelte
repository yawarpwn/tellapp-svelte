<script lang="ts">
	import type { Watermark } from '$lib/types'

	import MiniMasonry from 'minimasonry'

	import { onMount } from 'svelte'
	import CreateWatermark from './CreateWatermark.svelte'
	import { DownloadIcon, Share2Icon, TrashIcon } from 'lucide-svelte'
	import { enhance } from '$app/forms'
	import PhotoCard from './PhotoCard.svelte'

	type Props = {
		watermarks: Watermark[]
	}

	// function masonryLayout(containerEl: HTMLDivElement) {
	// 	const miniMasonry = new MiniMasonry({
	// 		container: containerEl
	// 	})
	//
	// 	miniMasonry.layout()
	// }

	let containerRef: HTMLDivElement
	let miniMasonry
	onMount(() => {
		miniMasonry = new MiniMasonry({
			container: containerRef,
			baseWidth: 150
		})
	})

	$effect(() => {
		miniMasonry.layout()
	})

	const { watermarks }: Props = $props()

	let selectedIds = $state<string[]>([])
	let loading = $state(false)

	function downLoadPhotos() {
		if (selectedIds.length === 0) return
		const photosToDownload = watermarks.filter((photo) => selectedIds?.includes(photo.id))

		for (const photo of photosToDownload) {
			fetch(photo.url)
				.then((res) => res.blob())
				.then((blob) => {
					const blobUrl = URL.createObjectURL(blob)
					const anchor = document.createElement('a')
					anchor.href = blobUrl
					const hash = new Date().getTime().toString()
					anchor.download = `tellsenales-photo-${hash}`
					anchor.target = '_blank'
					document.body.appendChild(anchor)
					anchor.click()
					document.body.removeChild(anchor)

					selectedIds = []
				})
		}
	}

	async function sharePhotos() {
		if (selectedIds.length === 0) return

		const photosToShare = watermarks
			.filter((photo) => selectedIds?.includes(photo.id))
			.map((photo) => photo.url)

		if (!navigator.share) {
			console.log('Share api no supported')
			return
		}
		const blobs = await Promise.all(
			photosToShare.map((url) => fetch(url).then((res) => res.blob()))
		)
		try {
			await navigator.share({
				title: 'Imagen para compartir',
				text: 'Mira esta imagen interesante!',
				files: [
					...blobs.map(
						(blob, index) =>
							new File([blob], `Tellsenales-foto-${index}.jpg`, {
								type: blob.type
							})
					)
				]
			})
		} catch (error) {
			console.error('Error al compartir la imagen:', error)
		} finally {
			selectedIds = []
		}

		console.log(photosToShare)
	}

	$inspect(selectedIds)
</script>

<section class="flex flex-col gap-4">
	<div class="text-center">Fotos Selecionadas ({selectedIds?.length})</div>
	<header class="flex items-center justify-between">
		<div class="flex gap-2">
			<button disabled={loading} class="btn" onclick={downLoadPhotos}>
				<DownloadIcon class="size-4" />
				<span class="hidden md:block">Descargar</span>
			</button>
			<button disabled={loading} onclick={sharePhotos} class="btn">
				<Share2Icon class="size-4" />
				<span class="hidden md:block">Compartir</span>
			</button>
			<form
				method="POST"
				action="?/delete"
				use:enhance={() => {
					loading = true
					return async ({ update }) => {
						await update()
						loading = false
					}
				}}
			>
				<button disabled={loading} name="ids" value={selectedIds?.join(',')} class="btn">
					<TrashIcon class="size-4" />
					<span class="hidden md:block">Eliminar</span>
				</button>
			</form>
		</div>
		<CreateWatermark bind:loading />
	</header>
	<div class="relative container mt-4" bind:this={containerRef}>
		{#each watermarks as watermark}
			<PhotoCard isSelected={selectedIds?.includes(watermark.id)} bind:selectedIds {watermark} />
		{/each}
	</div>
</section>
