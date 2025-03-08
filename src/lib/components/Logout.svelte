<script lang="ts">
	import { LogOutIcon } from 'lucide-svelte'
	import { enhance } from '$app/forms'
</script>

<form use:enhance method="POST" action="/actions?/logout">
	<button class="btn btn-primary w-full"
		>Salir
		<LogOutIcon />
	</button>
</form>
