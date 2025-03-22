<script lang="ts">
	import { page } from '$app/state'
	import { pushState } from '$app/navigation'
</script>

<h1>A Page</h1>

<button
	class="btn"
	onclick={() => {
		pushState(new URL('/quotations'), { replaceState: true })
	}}>acccion</button
>
<form method="GET">
	<input class="input" type="search" name="q" value={page.url.searchParams.get('q')} />
	<button>aceptar</button>
</form>
