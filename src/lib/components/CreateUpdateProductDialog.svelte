<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { page, navigating } from '$app/state'
	import { Loader2Icon } from 'lucide-svelte'
	import type { Product, ProductCategory } from '$lib/types'

	type Props = {
		open: boolean
		productsCategories: ProductCategory[]
		productToEdit?: Product
	}

	let { open = $bindable(false), productsCategories, productToEdit }: Props = $props()

	let loading = $state(false)
</script>

<Dialog bind:open>
	<form
		method="POST"
		action={productToEdit ? '?/update' : '?/create'}
		class="flex flex-col gap-2"
		use:enhance={() => {
			loading = true

			return async ({ update }) => {
				await update({ reset: false })
				open = false
				loading = false
			}
		}}
	>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Descripción</legend>
			<textarea
				defaultvalue={productToEdit?.description ?? ''}
				disabled={loading}
				name="description"
				class="textarea min-h-[150px] w-full resize-none md:min-h-[100px]"
				placeholder="Descripción del productos ..."
			></textarea>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Unindad / Medida</legend>
			<input
				defaultvalue={productToEdit?.unitSize ?? ''}
				disabled={loading}
				name="unitSize"
				type="text"
				class="input w-full"
				placeholder="20x20cm"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Código</legend>
			<input
				defaultvalue={productToEdit?.code ?? ''}
				disabled={loading}
				name="code"
				type="text"
				class="input w-full"
				placeholder="FHIP40"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Link</legend>
			<input
				defaultvalue={productToEdit?.link ?? ''}
				disabled={loading}
				name="link"
				type="text"
				class="input w-full"
				placeholder="https://tellsenales.com/products/example-product"
			/>
		</fieldset>
		<div class="grid grid-cols-2 gap-2">
			<fieldset class="fieldset">
				<legend class="fieldset-legend text-base-content/50">Costo</legend>
				<input
					defaultvalue={productToEdit?.cost ?? ''}
					disabled={loading}
					name="cost"
					type="number"
					class="input w-full"
					placeholder="10.00"
				/>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend text-base-content/50">Precio</legend>
				<input
					defaultvalue={productToEdit?.price ?? ''}
					disabled={loading}
					name="price"
					type="number"
					class="input w-full"
					placeholder="20.00"
				/>
			</fieldset>
		</div>
		<select
			disabled={loading}
			value={productToEdit?.categoryId ?? 'default'}
			name="categoryId"
			class="select w-full"
		>
			<option value="default" disabled selected>Selecionar Categoria</option>
			{#each productsCategories as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>
		<input type="hidden" name="id" value={productToEdit?.id ?? undefined} />
		<footer class="mt-4 flex justify-between">
			<button disabled={loading} onclick={() => (open = false)} class="btn">Cancelar</button>
			<button disabled={loading} class="btn btn-primary" type="submit">
				{productToEdit ? 'Actualizar' : 'Crear'}
				{#if loading}
					<Loader2Icon class="animate-spin" />
				{/if}
			</button>
		</footer>
	</form>
</Dialog>
