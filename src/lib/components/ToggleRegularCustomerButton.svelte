<script lang="ts">
	import { StarIcon } from 'lucide-svelte'
	import { enhance } from '$app/forms'

	type Props = {
		isRegular: boolean
		customerId: string
	}
	const { isRegular, customerId }: Props = $props()
	console.log({ isRegular })
</script>

<form use:enhance method="POST" action="?/toggle-regular-customer">
	<input type="hidden" name="id" value={customerId} />
	<button class="btn btn-sm">
		{#if isRegular}
			<StarIcon fill="var(--color-primary)" size={18} />
		{:else}
			<StarIcon size={18} />
		{/if}
		<span class="hidden lg:block">Favorito</span>
	</button>
</form>
