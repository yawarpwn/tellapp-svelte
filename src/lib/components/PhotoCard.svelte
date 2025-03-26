<script lang="ts">
	import type { Watermark } from '$lib/types'
	type Props = {
		watermark: Watermark
		isSelected: boolean
		selectedIds: string[]
	}
	let { watermark, isSelected, selectedIds }: Props = $props()
	let showActions = $state(false)
</script>

<article
	onmouseenter={() => (showActions = true)}
	onmouseleave={() => (showActions = false)}
	data-active={isSelected ? 'true' : 'false'}
	class="absolute overflow-hidden rounded-md"
>
	{#if isSelected || showActions}
		<label class="absolute inset-0 z-50 cursor-pointer bg-black/70 p-1">
			<div class="flex justify-between">
				<input
					class="checkbox checkbox-neutral checkbox-sm bg-base-content/20"
					type="checkbox"
					value={watermark.id}
					bind:group={selectedIds}
				/>
			</div>
		</label>
	{/if}
	<img loading="lazy" src={watermark.thumbUrl} alt={watermark.id} />
</article>
