<script lang="ts">
	import type { Watermark } from '$lib/types'
	type Props = {
		watermark: Watermark
		isSelected: boolean
		selectedIds: string[]
		onChecked: (id: string) => void
	}
	let { watermark, isSelected, selectedIds = $bindable() }: Props = $props()
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
					onchange={(ev) => {
						const checked = (ev.target as HTMLInputElement).checked
						if (checked) {
							selectedIds = [...selectedIds, watermark.id]
						} else {
							selectedIds = selectedIds.filter((id) => id !== watermark.id)
						}
					}}
				/>
			</div>
		</label>
	{/if}
	<img loading="lazy" src={watermark.thumbUrl} alt={watermark.id} />
</article>
