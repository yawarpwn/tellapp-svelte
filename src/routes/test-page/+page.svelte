<script lang="ts">
	import {
		addItem,
		getItems,
		getQuotation,
		setQuotation
	} from '$lib/stores/shared-quotation.svelte'
	import ChildComponent from '../test-page/ChildComponent.svelte'

	let checked = $state(false)

	$effect(() => {
		setQuotation({
			credit: 10,
			number: 200
		})
	})

	const quotation = getQuotation()
	const items = getItems()
</script>

<nav class="menu">
	<a href="/test-page-2">Test page 2</a>
</nav>
<h1>Test Page</h1>

<button class="btn" onclick={addItem}>Agregar</button>

<input class="checkbox" bind:checked type="checkbox" />
<br />

{#if checked}
	<ChildComponent />
{/if}
{JSON.stringify(quotation, null, 2)}
