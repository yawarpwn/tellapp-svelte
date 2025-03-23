<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { page, navigating } from '$app/state'
	import { Loader2Icon } from 'lucide-svelte'
	type Props = {
		open: boolean
	}
	let { open = $bindable(false) } = $props()
	let loading = $state(false)
	console.log('page.form', page.form)
</script>

<Dialog bind:open>
	<form
		method="POST"
		action="?/create"
		class="flex flex-col gap-2"
		use:enhance={() => {
			loading = true

			return async ({ update }) => {
				await update()
				open = false
				loading = false
			}
		}}
	>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Descripción</legend>
			<textarea
				name="description"
				class="textarea w-full"
				placeholder="Descripción del productos ..."
			></textarea>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Unindad / Medida</legend>
			<input name="unitSize" type="text" class="input w-full" placeholder="20x20cm" />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Código</legend>
			<input name="code" type="text" class="input w-full" placeholder="FHIP40" />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Link</legend>
			<input
				name="link"
				type="text"
				class="input w-full"
				placeholder="https://tellsenales.com/products/example-product"
			/>
		</fieldset>
		<div class="grid grid-cols-2 gap-2">
			<fieldset class="fieldset">
				<legend class="fieldset-legend text-base-content/50">Precio</legend>
				<input name="price" type="number" class="input w-full" placeholder="20.00" />
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend text-base-content/50">Costo</legend>
				<input name="cost" type="number" class="input w-full" placeholder="10.00" />
			</fieldset>
		</div>
		<footer class="flex justify-between">
			<button onclick={() => (open = false)} class="btn">Cancelar</button>
			<button class="btn btn-primary" type="submit">
				Aceptar
				{#if loading}
					<Loader2Icon class="animate-spin" />
				{/if}
			</button>
		</footer>
	</form>
</Dialog>
