<script lang="ts">
	import { enhance, applyAction } from '$app/forms'
	import { goto } from '$app/navigation'
	import type { PageData, ActionData } from './$types'
	let loading = $state(false)

	let { data, form }: { data: PageData; form: ActionData } = $props()
</script>

<h1 class="text-3xl text-orange-500">TEll App</h1>

{#if form?.missing}<p class="error">The email field is required</p>{/if}
{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}

<form
	id="auth"
	method="POST"
	use:enhance={() => {
		loading = true

		return async ({ result }) => {
			loading = false

			if (result.type === 'success') {
				goto('/quotations')
				console.log('formulario enviado correctamente')
			}
		}
	}}
>
	<label>
		Email
		<input name="email" type="email" value={form?.email ?? ''} />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button>
		{#if loading}
			loading...
		{:else}
			Login
		{/if}
	</button>
	<div>
		{#if form?.error}
			<p class="text-red-500">Invalid password or email</p>
		{/if}
	</div>
</form>
