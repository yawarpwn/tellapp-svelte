<script lang="ts">
	import { setToastState } from '$lib/toaster/toast-state.svelte'

	setToastState()
	const { children } = $props()
</script>

{@render children()}
