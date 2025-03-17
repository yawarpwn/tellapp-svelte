<script lang="ts">
	import { quotationStore } from './store.svelte'
	// import A from './A.svelte'
	// import B from './B.svelte'
	import C from './C.svelte'

	const { quotation } = quotationStore
</script>

<button
	class="btn btn-dash"
	onclick={() => {
		quotationStore.addItem({
			id: crypto.randomUUID(),
			name: 'texto'
		})
	}}
	>add item
</button>
<div class="card bg-base-300">
	<div class="card-body">
		<pre>
      {JSON.stringify(quotation)}
    </pre>
	</div>
</div>

<C />
