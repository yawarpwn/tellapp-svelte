<script lang="ts">
	import { cn } from '$lib/utils'

	type Props = {
		class?: string
	}
	const props: Props = $props()
</script>

<div class={cn('skeleton rounded-lg', props.class)}></div>
