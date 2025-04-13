<script lang="ts">
	import type { Watermark } from '$lib/types'
	import { EyeIcon, XIcon } from 'lucide-svelte'
	import Dialog from './ui/Dialog.svelte'
	type Props = {
		watermark: Watermark
		isSelected: boolean
		selectedIds: string[]
	}
	let { watermark, isSelected, selectedIds = $bindable() }: Props = $props()
	let showActions = $state(false)

	let openModal = $state(false)
	// const aspectRatio = watermark.width / watermark.height
	const aspectRatio = `${watermark.width}/${watermark.height}`
</script>

{#if openModal}
	<Dialog
		bind:open={openModal}
		contentProps={{
			class: `p-0`
		}}
	>
		<div
			style="aspect-ratio: {aspectRatio}; width: {watermark.width} height: {watermark.height}"
			class="skeleton relative overflow-hidden"
		>
			<img class="absolute inset-0 h-full w-full object-cover" src={watermark.watermarkedUrl} />
		</div>
		<button
			class="bg-base-100/80 hover:bg-base-100/50 absolute top-2 right-2 cursor-pointer rounded-full p-1"
			onclick={() => (openModal = false)}
			type="button"
		>
			<XIcon class="size-4" />
		</button>
	</Dialog>
{/if}

<article
	onmouseenter={() => (showActions = true)}
	onmouseleave={() => (showActions = false)}
	data-active={isSelected ? 'true' : 'false'}
	style="aspect-ratio: {aspectRatio}"
	class="data-[active=true]:border-primary absolute overflow-hidden rounded-md border-2 border-dashed border-transparent"
>
	<div class="skeleton absolute inset-0">
		{#if isSelected || showActions}
			<label class="absolute inset-0 z-50 cursor-pointer bg-black/50 p-1">
				<div class="flex justify-between">
					<input
						class="checkbox checkbox-neutral checkbox-sm bg-base-content/20"
						type="checkbox"
						onchange={(ev) => {
							const checked = (ev.target as HTMLInputElement).checked
							if (checked) {
								selectedIds = [...selectedIds, watermark.id]
							} else {
								selectedIds = selectedIds.filter((id) => id !== watermark.id)
							}
						}}
					/>
					<button class="cursor-pointer" onclick={() => (openModal = true)}>
						<EyeIcon class="size-5" />
					</button>
				</div>
			</label>
		{/if}

		<img
			class="absolute inset-0 size-full object-cover"
			loading="lazy"
			src={watermark.thumbUrl}
			alt={watermark.id}
		/>
	</div>
</article>
