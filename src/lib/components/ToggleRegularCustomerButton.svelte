<script lang="ts">
	import { StarIcon } from 'lucide-svelte'
	import { enhance } from '$app/forms'

	type Props = {
		isRegular: boolean
		customerId: string
	}
	const { isRegular, customerId }: Props = $props()
	let status = $state(isRegular ? 'favorite' : 'not-favorite')
</script>

<form use:enhance method="POST" action="?/toggle-regular-customer">
	<input type="hidden" name="id" value={customerId} />
	<input type="hidden" name="status" value={isRegular ? 'favorite' : 'not-favorite'} />
	<button
		class="btn btn-sm"
		onclick={() => (status = status === 'favorite' ? 'not-favorite' : 'favorite')}
	>
		{#if status === 'favorite'}
			<StarIcon fill="var(--color-primary)" size={18} />
		{:else}
			<StarIcon size={18} />
		{/if}
		<span class="hidden lg:block">Favorito</span>
	</button>
</form>
