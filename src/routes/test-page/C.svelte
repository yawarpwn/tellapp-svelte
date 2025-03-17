<script lang="ts">
	import { quotationStore } from './store.svelte'

	$inspect(quotationStore)
</script>

<input type="checkbox" class="checkbox" bind:checked={quotationStore.showModal} />
<!-- <div class="card"> -->
<input class="input" bind:value={quotationStore.quotation.number} />
<div class="card-body">
	{JSON.stringify({ quotationStore })}
</div>
<!-- </div> -->
<button class="btn" onclick={() => quotationStore.openModal()}> open Modal </button>
<!-- <utton class="btn btn-accent" onclick={() => {}}>add Item</utton> -->
