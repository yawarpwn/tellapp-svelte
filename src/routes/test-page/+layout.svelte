<script lang="ts">
	import Toaster from '$lib/toaster/Toaster.svelte'
	const { children } = $props()
</script>

<Toaster />
{@render children()}
