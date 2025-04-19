<script lang="ts">
	import type { PageProps } from './$types'
	import SignalPage from '$lib/components/SignalPage.svelte'

	let { data, form }: PageProps = $props()
</script>

<SignalPage signals={data.signals} signalCategories={data.signalCategories} />
