<script lang="ts">
	import { page } from '$app/state'
	import { pushState } from '$app/navigation'
	import { navigating } from '$app/state'
	const { data, form } = $props()
</script>

<h1>A Page</h1>
{#if navigating.to}
	<div>searching...</div>
{/if}

<button
	class="btn"
	onclick={() => {
		pushState(new URL('/quotations'), { replaceState: true })
	}}>acccion</button
>
<form data-sveltekit-reload>
	<input class="input" type="search" name="q" value={data.q} />
	<button>aceptar</button>
</form>
<div>
	{data.q}
</div>
