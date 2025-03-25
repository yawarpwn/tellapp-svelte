<script lang="ts">
	import type { PageProps } from './$types'
	import { enhance } from '$app/forms'
	import Logo from '$lib/components/Logo.svelte'
	let loading = $state(false)

	let { data, form }: PageProps = $props()
</script>

<div class="main-cover flex h-svh">
	<main class="flex h-full flex-1 flex-col items-center">
		<div class=" flex flex-1 flex-col justify-center">
			<article
				class=" bg-base-300/80 w-[300px] rounded-lg p-6 pt-8 pb-16 shadow-2xl backdrop-blur-md xl:w-[350px]"
			>
				<header class="mb-10">
					<div class="flex items-center justify-center">
						<Logo />
					</div>
					<p class="mt-2 text-center text-sm">Gestión de Cotizaciones, Clientes, Productos</p>
				</header>
				<form
					id="auth"
					method="POST"
					action="?/login"
					use:enhance={() => {
						loading = true

						return async ({ result, update }) => {
							await update()
							loading = false
						}
					}}
				>
					<div class="flex flex-col gap-4">
						<fieldset class="fieldset">
							<label class="fieldset-label grid gap-2">
								Email
								<input
									class="input w-full"
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
								<input class="input w-full" name="password" type="password" />
							</label>
						</fieldset>
						{#if form?.missing}<p class="text-error text-sm">Los campos son requeridos</p>{/if}
						{#if form?.error}<p class="text-error text-sm">{form.error}</p>{/if}
						<button class="btn btn-primary">
							Entrar
							{#if loading}
								<div class="loading loading-dots"></div>
							{/if}
						</button>
					</div>
				</form>
				<footer class="my-8 self-center text-sm">
					<div>
						<span class="text-base-content/60">¿Necesitas una cuenta?</span>
						<a href="#" class="text-accent underline">Registrate</a>
					</div>
				</footer>
			</article>
			<!-- Title Login -->
		</div>
	</main>
	<aside class="hidden flex-1 flex-shrink basis-2/4 items-center justify-center p-8 lg:flex">
		<div class="relative">
			<div
				class="bg-base-300/60 absolute right-1 bottom-1 z-10 flex max-w-md items-center gap-2 rounded-md px-4"
			>
				<div class=" text-sm italic">
					<p class="mt-2 max-w-[200px] text-center">
						Todo nuestros logros son para ti y gracias a ti🙏
					</p>
				</div>
				<div class="flex h-auto w-[150px] justify-center object-cover">
					<img
						class="animate-bounce"
						loading="lazy"
						width={348}
						height={314}
						src="/johneyder-yoshi.webp"
						alt="Johneyer mi hijo montando yoshi"
					/>
				</div>
			</div>
			<img
				alt="Foto en familia"
				class="h-1/3 rounded-lg object-cover"
				src="/johneyder-photo.avif"
			/>
		</div>
	</aside>
</div>

<style>
	.main-cover {
		/* Establecer la imagen de fondo */
		background-image: url('/pies-playa.avif');

		/* Asegurarse de que la imagen cubra todo el fondo */
		background-size: cover;
		background-position: center;

		/* Agregar una capa de color semitransparente */
		background-color: rgba(0, 0, 0, 0.7); /* Blanco con 50% de transparencia */

		/* Asegurarse de que el contenido no se superponga con el fondo */
		background-blend-mode: overlay; /*Opcional: mezcla el color con la imagen */
	}
</style>
