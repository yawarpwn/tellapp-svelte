<script lang="ts">
	const { toast } = $props()
	import { toastState } from './toast-state.svelte'
	import XIcon from 'lucide-svelte/icons/x'
</script>

<div
	class="text-base-content relative flex h-16 w-60 flex-col justify-center rounded-md border border-gray-300 bg-gray-300 p-2 shadow-md"
>
	<span>{toast.title}</span>
	<span>{toast.message}</span>
	<button
		class="absolute top-2 right-2 size-5"
		onclick={() => {
			toastState.remove(toast.id)
		}}
	>
		<span class="sr-only">close toast</span>
		<XIcon class="size-4" />
	</button>
</div>
