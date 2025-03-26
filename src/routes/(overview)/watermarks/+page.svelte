<script lang="ts">
	import CreateWatermark from '$lib/components/CreateWatermark.svelte'
	import type { PageProps } from './$types'
	import WatermarksList from '$lib/components/WatermarksList.svelte'

	const { form, data }: PageProps = $props()
</script>

{#await data.watermarksPromise}
	<div>Cargando...</div>
{:then watermarks}
	<WatermarksList {watermarks} />
{/await}
