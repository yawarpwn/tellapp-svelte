<script lang="ts">
	import type { PageProps } from './$types'
	import WatermarksList from '$lib/components/WatermarksList.svelte'
	import MasonrySkeleton from '$lib/components/ui/MasonrySkeleton.svelte'

	const { form, data }: PageProps = $props()
</script>

{#await data.watermarksPromise}
	<MasonrySkeleton />
{:then watermarks}
	<WatermarksList {watermarks} />
{/await}
