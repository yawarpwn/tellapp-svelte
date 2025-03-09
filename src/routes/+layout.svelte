<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import '../app.css'
	let { children } = $props()
</script>

{@render children()}
