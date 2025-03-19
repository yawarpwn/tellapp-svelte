<script lang="ts">
	import { toastState } from './toast-state.svelte'
	import Toast from './Toast.svelte'

	toastState.showToast = true
	console.log(toastState.showToast)
</script>

<div class="absolute top-2 right-2 flex flex-col gap-2">
	{#each toastState.toasts as toast}
		<Toast {toast} />
	{/each}
</div>
