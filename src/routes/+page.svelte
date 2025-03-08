<script lang="ts">
	import type { PageProps } from './$types'
	import { enhance } from '$app/forms'
	let loading = $state(false)

	let { data, form }: PageProps = $props()

	console.log({ form })
</script>

<div
	class="masonry-container grid h-screen place-content-center bg-[url(/masonry.jpg)] bg-cover bg-center"
>
	<main class="bg-base-100/10 min-w-xs rounded-md p-6 py-20 backdrop-blur-lg">
		<h1
			class="from-primary to-secondary bg-gradient-to-r bg-clip-text text-center text-2xl font-extrabold text-transparent"
		>
			TELLAPP
		</h1>
		<form
			id="auth"
			method="POST"
			action="?/login"
			use:enhance={() => {
				loading = true

				return async ({ result, update }) => {
					loading = false
					update()
				}
			}}
		>
			<div class="flex flex-col gap-4">
				<fieldset class="fieldset">
					<label class="fieldset-label grid gap-2">
						Email
						<input
							class="input"
							placeholder="nombre@email.com.pe"
							name="email"
							type="email"
							value={form?.email ?? ''}
						/>
					</label>
				</fieldset>
				<fieldset class="fieldset">
					<label class="fieldset-label grid gap-2">
						Password
						<input class="input" name="password" type="password" />
					</label>
				</fieldset>
				{#if form?.missing}<p class="text-error text-sm">Los campos son requeridos</p>{/if}
				{#if form?.error}<p class="text-error text-sm">{form.error}</p>{/if}
				<button class="btn btn-primary w-full">
					<span>Entrar</span>
					{#if loading}
						<div class="loading loading-dots"></div>
					{/if}
				</button>
			</div>
		</form>
	</main>
</div>

<style>
	.masonry-container {
		position: relative;
		z-index: 1;
	}
	.masonry-container::before {
		content: '';
		display: block;
		position: absolute;
		inset: 0;
		background-color: oklch(0 0 0 / 0.95);
		opacity: 0.9;
		z-index: 0;
	}
</style>
