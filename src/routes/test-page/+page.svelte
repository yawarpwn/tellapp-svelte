<script lang="ts">
	import { quotation } from '$lib/stores/shared'

	let quo

	const usb = quotation.subscribe((value) => {
		quo = value
	})
</script>

<h1>Test Page</h1>
<button
	class="btn"
	onclick={() => {
		quotation.set({
			id: '230320',
			customer: {
				name: 'que fuee'
			}
		})
	}}>update quotation</button
>

{JSON.stringify(quo)}
