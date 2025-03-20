<script lang="ts">
	import { toastState } from './toast-state'
	import { get } from 'svelte/store'
	import Toast from './Toast.svelte'
</script>

<div class="absolute top-2 right-2 flex flex-col gap-2">
	{#each get(toastState.toasts) as toast}
		<Toast {toast} />
	{/each}
</div>
