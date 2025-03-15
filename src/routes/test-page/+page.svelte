<script lang="ts">
	import { get } from 'svelte/store'
	import { quotation } from '$lib/stores/shared'

	// const usb = quotation.subscribe((value) => {
	// 	quo = value
	// })
</script>

<h1>Test Page</h1>

{JSON.stringify($quotation, null, 2)}
