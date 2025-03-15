<script lang="ts">
	import { get } from 'svelte/store'
	import { quotation, addItem, getQuotation } from '$lib/stores/shared'

	// const usb = quotation.subscribe((value) => {
	// 	quo = value
	// })
</script>

<h1>Test Page</h1>
<button class="btn" onclick={addItem}>update quotation</button>

{JSON.stringify($quotation, null, 2)}
