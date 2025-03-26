<script lang="ts">
	import type { Watermark } from '$lib/types'
	import { fly } from 'svelte/transition'

	import MiniMasonry from 'minimasonry'

	import { onMount } from 'svelte'
	import CreateWatermark from './CreateWatermark.svelte'
	import { DownloadIcon, Share2Icon, TrashIcon, XIcon } from 'lucide-svelte'
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

	function clearSelectedIds() {
		selectedIds = []
	}

	function handleChecked(id: string) {}
	$inspect(selectedIds)
</script>

<section class="flex flex-col gap-4">
	<section class="md:bg-base-300 flex flex-col items-center justify-between gap-2 p-4 md:flex-row">
		{#if selectedIds.length > 0}
			<aside
				class="flex w-full flex-col gap-2 rounded-md md:w-auto md:flex-row"
				in:fly={{ y: 20 }}
				out:fly={{ y: 20 }}
			>
				<button disabled={loading} class="btn" onclick={downLoadPhotos}>
					<DownloadIcon class="size-4" />
					<span class="">Descargar </span>
				</button>
				<button disabled={loading} onclick={sharePhotos} class="btn">
					<Share2Icon class="size-4" />
					<span class="">Compartir</span>
				</button>
				<form
					method="POST"
					action="?/delete"
					class="btn"
					use:enhance={() => {
						loading = true
						return async ({ update }) => {
							await update()
							loading = false
						}
					}}
				>
					<button disabled={loading} name="ids" value={selectedIds?.join(',')} class="">
						<TrashIcon class="size-4" />
					</button>
					<span class="">Eliminar </span>
				</form>
				<button disabled={loading} onclick={clearSelectedIds} class="btn">
					<XIcon class="size-4" />
					<span> Deseleccionar</span>
					<span
						class="bg-base-content text-base-100 flex size-4 items-center justify-center rounded-full text-sm"
						>{selectedIds.length}</span
					>
				</button>
			</aside>
		{/if}

		<CreateWatermark bind:loading />
	</section>
	<div class="relative container mt-4" bind:this={containerRef}>
		{#each watermarks as watermark}
			<PhotoCard
				isSelected={selectedIds?.includes(watermark.id)}
				{watermark}
				onChecked={() => {}}
				bind:selectedIds
			/>
		{/each}
	</div>
</section>
