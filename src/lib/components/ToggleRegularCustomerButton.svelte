<script lang="ts">
	import { StarIcon } from 'lucide-svelte'
	import { enhance } from '$app/forms'

	type Props = {
		isRegular: boolean
		customerId: string
	}
	const { isRegular, customerId }: Props = $props()
	let status = $derived(isRegular ? 'favorite' : 'not-favorite')
	let updating = $state(false)

	$inspect(isRegular)
</script>

<form
	method="POST"
	action="?/toggle-regular-customer"
	use:enhance={() => {
		updating = true
		return async ({ update }) => {
			await update()
			updating = false
		}
	}}
>
	<input type="hidden" name="id" value={customerId} />
	<input type="hidden" name="status" value={isRegular ? 'favorite' : 'not-favorite'} />
	<button type="submit" class="btn btn-sm" disabled={updating}>
		{#if status === 'favorite'}
			<StarIcon fill="var(--color-primary)" class="text-primary" size={18} />
		{:else}
			<StarIcon class="text-base-content/50" size={18} />
		{/if}
		<span class="hidden lg:block">Favorito</span>
	</button>
</form>
