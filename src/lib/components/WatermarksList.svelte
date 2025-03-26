<script lang="ts">
	import type { Watermark } from '$lib/types'

	import MiniMasonry from 'minimasonry'

	import { onMount } from 'svelte'
	import CreateWatermark from './CreateWatermark.svelte'
	import { DownloadIcon, Share2Icon, TrashIcon } from 'lucide-svelte'

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
	onMount(() => {
		const miniMasonry = new MiniMasonry({
			container: containerRef,
			baseWidth: 150
		})
	})
	const { watermarks }: Props = $props()

	let selectedIds = $state<null | string[]>(null)

	function downLoadPhotos() {
		if (!selectedIds) return
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

					selectedIds = null
				})
		}
	}

	async function sharePhotos() {
		if (!selectedIds) return

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
			selectedIds = null
		}

		console.log(photosToShare)
	}

	$inspect(selectedIds)
</script>

<section class="flex flex-col gap-4">
	<div class="text-center">Fotos Selecionadas ({selectedIds?.length})</div>
	<header class="flex items-center justify-between">
		<div class="flex gap-2">
			<button class="btn" onclick={downLoadPhotos}>
				<DownloadIcon class="size-4" />
			</button>
			<button onclick={sharePhotos} class="btn">
				<Share2Icon class="size-4" />
			</button>
			<button class="btn">
				<TrashIcon class="size-4" />
			</button>
		</div>
		<CreateWatermark />
	</header>
	<div class="container mt-4" bind:this={containerRef}>
		{#each watermarks as watermark}
			<article data-active={selectedIds?.includes(watermark.id) ? 'true' : 'false'}>
				<label class="absolute inset-0 z-50 cursor-pointer">
					<input class="sr-only" type="checkbox" value={watermark.id} bind:group={selectedIds} />
				</label>
				<img src={watermark.thumbUrl} alt={watermark.id} />
			</article>
		{/each}
	</div>
</section>

<style>
	.container {
		position: relative;
	}

	article {
		position: absolute;
		cursor: pointer;
		z-index: 1;
		img {
			display: block;
			width: 100%;
		}
	}

	/* article:hover::after, */
	article[data-active='true']::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		z-index: 10;
	}
</style>
