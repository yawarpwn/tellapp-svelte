<script lang="ts">
	import type { Watermark } from '$lib/types'

	import MiniMasonry from 'minimasonry'
	import CreateWatermark from './CreateWatermark.svelte'
	import { DownloadIcon, Share2Icon, TrashIcon, XIcon, Loader2Icon } from 'lucide-svelte'
	import { enhance } from '$app/forms'
	import PhotoCard from './PhotoCard.svelte'

	type Props = {
		watermarks: Watermark[]
	}

	const { watermarks }: Props = $props()

	let selectedIds = $state<string[]>([])
	let isDeleting = $state(false)
	let isSharing = $state(false)
	let isDownloading = $state(false)

	function downLoadPhotos() {
		if (selectedIds.length === 0) return
		const photosToDownload = watermarks.filter((photo) => selectedIds?.includes(photo.id))

		isDownloading = true
		for (const photo of photosToDownload) {
			fetch(photo.watermarkedUrl)
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
		isDownloading = false
	}

	async function sharePhotos() {
		if (selectedIds.length === 0) return

		const photosToShare = watermarks
			.filter((photo) => selectedIds?.includes(photo.id))
			.map((photo) => photo.watermarkedUrl)

		if (!navigator.share) {
			console.log('Share api no supported')
			return
		}
		isSharing = true
		const blobs = await Promise.all(
			photosToShare.map((url) => fetch(url).then((res) => res.blob()))
		)
		try {
			await navigator.share({
				title: 'Imagen para compartir',
				text: 'Señales de seguridad | tellsenales.com',
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
			isSharing = false
		}

		console.log(photosToShare)
	}

	function clearSelectedIds() {
		selectedIds = []
	}

	const hasItems = $derived(selectedIds.length > 0)

	function masonryLayout(container: HTMLDivElement) {
		const miniMasonry = new MiniMasonry({
			container: container,
			baseWidth: 150,
			gutter: 10,
			minify: true
		})
	}
</script>

<section class="relative">
	<div
		class="bg-base-100 fixed top-14 right-0 left-0 z-40 flex items-center justify-between gap-2 p-3 lg:static"
	>
		<div>
			<aside class="flex items-center justify-between gap-4 rounded-md">
				<div class="flex items-center gap-2">
					<button disabled={isDeleting} onclick={clearSelectedIds} class="btn btn-circle btn-xs">
						<XIcon class="size-4" />
					</button>
					<div class="flex items-center gap-2">
						<span class="text-xs md:text-sm">({selectedIds.length}) Fotos </span>
					</div>
				</div>
				<div class="flex gap-1">
					<button
						disabled={isDownloading || isDeleting || !hasItems}
						class="btn btn-sm"
						onclick={downLoadPhotos}
					>
						<DownloadIcon class="size-4" />
						<span class="hidden md:block">Descargar </span>
					</button>
					<button disabled={isDeleting || !hasItems} onclick={sharePhotos} class="btn btn-sm">
						{#if isSharing}
							<Loader2Icon class="size-4 animate-spin" />
						{:else}
							<Share2Icon class="size-4" />
						{/if}
						<span class="hidden md:block">Compartir</span>
					</button>
					<form
						method="POST"
						action="?/delete"
						class=""
						use:enhance={() => {
							isDeleting = true
							return async ({ update }) => {
								await update()
								isDeleting = false
							}
						}}
					>
						<button
							type="submit"
							disabled={isDeleting || !hasItems}
							name="ids"
							value={selectedIds?.join(',')}
							class="btn btn-sm w-full"
						>
							{#if isDeleting}
								<Loader2Icon class="size-4 animate-spin" />
							{:else}
								<TrashIcon class="size-4" />
							{/if}
							<span class="hidden md:block">Eliminar </span>
						</button>
					</form>
				</div>
			</aside>
		</div>

		<CreateWatermark bind:loading={isDeleting} />
	</div>
	<div class="relative mt-16 lg:mt-4" use:masonryLayout>
		{#each watermarks as watermark}
			<PhotoCard isSelected={selectedIds?.includes(watermark.id)} {watermark} bind:selectedIds />
		{/each}
	</div>
</section>
