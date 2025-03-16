<script lang="ts">
	import {
		deleteitem,
		getQuotation,
		getItems,
		setQuotation
	} from '$lib/stores/shared-quotation.svelte'

	const quotation = getQuotation()
	const items = getItems()
</script>

<div class="border border-orange-500">
	<pre>
    {JSON.stringify(quotation)}
  </pre>
</div>

<button
	onclick={() =>
		setQuotation({
			credit: 1000,
			number: 1000
		})}
	class="btn btn-warning">update</button
>
<button onclick={deleteitem} class="btn btn-warning"> borrar </button>
