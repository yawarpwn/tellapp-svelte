<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import { enhance } from '$app/forms'
	import { Loader2Icon } from 'lucide-svelte'
	import type { Product, ProductCategory } from '$lib/types'

	type Props = {
		open: boolean
		productsCategories: ProductCategory[]
		productToEdit?: Product
		closeModal: () => void
	}

	let { open = $bindable(false), productsCategories, productToEdit, closeModal }: Props = $props()

	let loading = $state(false)
</script>

<Dialog bind:open onOpenChange={closeModal}>
	<form
		method="POST"
		action={productToEdit ? '?/update' : '?/create'}
		class="flex flex-col gap-2"
		use:enhance={() => {
			loading = true

			return async ({ update, result }) => {
				if (result.type === 'success') {
					await update({ reset: false })
					open = false
				}

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
				required
				class="textarea min-h-[150px] w-full resize-none md:min-h-[100px]"
				placeholder="Descripción del productos ..."
			></textarea>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend text-base-content/50">Unindad / Medida</legend>
			<input
				required
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
				required
				defaultvalue={productToEdit?.code ?? ''}
				disabled={loading}
				name="code"
				maxlength="20"
				minlength="4"
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
				pattern="^https:\/\/tellsenales\.com.*"
				placeholder="https://tellsenales.com/products/example-product"
			/>
		</fieldset>
		<div class="grid grid-cols-2 gap-2">
			<fieldset class="fieldset">
				<legend class="fieldset-legend text-base-content/50">Costo</legend>
				<input
					required
					defaultvalue={productToEdit?.cost ?? ''}
					disabled={loading}
					name="cost"
					step="0.1"
					type="number"
					class="input w-full"
					placeholder="10.00"
				/>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend text-base-content/50">Precio</legend>
				<input
					required
					defaultvalue={productToEdit?.price ?? ''}
					disabled={loading}
					inputmode="decimal"
					name="price"
					step="0.1"
					type="number"
					class="input w-full"
					placeholder="20.00"
				/>
			</fieldset>
		</div>
		<select
			required
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
			<button disabled={loading} onclick={closeModal} class="btn">Cancelar</button>
			<button disabled={loading} class="btn btn-primary" type="submit">
				{productToEdit ? 'Actualizar' : 'Crear'}
				{#if loading}
					<Loader2Icon class="animate-spin" />
				{/if}
			</button>
		</footer>
	</form>
</Dialog>
