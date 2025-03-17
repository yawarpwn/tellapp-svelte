<script lang="ts">
	const { children } = $props()
	import { createInvoiceStore } from './store'

	const store = createInvoiceStore()
</script>

<div class="border">
	A cmponent
	<div class="flex justify-between">
		<prev>
			{JSON.stringify(store, null, 2)}
		</prev>
	</div>
</div>
