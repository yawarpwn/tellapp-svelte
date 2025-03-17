<script lang="ts">
	import { getContext } from 'svelte'

	const { quo } = getContext('quo')
</script>

<button
	class="btn"
	onclick={() => {
		quo.deadline = 20
	}}
>
	modify</button
>

<div class="w-full border">
	B component
	{JSON.stringify(quo, null, 2)}
</div>
