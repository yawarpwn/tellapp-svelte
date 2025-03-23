<script lang="ts">
	import { CirclePlusIcon, SearchIcon, TrashIcon, XIcon } from 'lucide-svelte'
	import { enhance } from '$app/forms'
	import type { PageProps } from './$types'
	import CreateUpdateProductDialog from '$lib/components/CreateUpdateProductDialog.svelte'
	import { toast } from 'svelte-sonner'

	let { data, form = $bindable() }: PageProps = $props()

	let query = ''
	let open = $state(false)

	console.log('form:', form?.errors)
</script>

{#if open}
	<CreateUpdateProductDialog bind:open />
{/if}
<form
	method="POST"
	action="?/create"
	use:enhance={() => {
		return ({ update }) => {
			update({
				reset: false
			})
		}
	}}
>
	<input class="input" name="price" />
	<button class="btn">Send</button>
</form>
<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<form method="GET" class="relative max-w-[200px] md:max-w-[350px]">
			<label class="input px-2">
				<SearchIcon class="h-[1em] opacity-50" />
				<input name="q" type="search" class="" placeholder="Buscar..." />
				<input name="page" value={1} type="hidden" />
				{#if query}
					<button
						type="button"
						onclick={() => {
							query = ''
						}}
						class="bg-base-100 text-base-content/50 hover:text-base-content cusrsor-pointer hover:bg-base-300 absolute right-1 z-10 flex size-6 items-center justify-center rounded-full"
					>
						<XIcon class="h-[1em]" />
					</button>
				{/if}
			</label>
		</form>
		<button onclick={() => (open = true)} class="btn btn-primary">
			<CirclePlusIcon />
			Crear</button
		>
	</div>
	<div class="flex flex-col gap-4">
		{#each data.products as product}
			<article class="card bg-base-200">
				<div class="card-body">
					{product.description}
					<div>
						<form method="POST" action="?/delete" use:enhance>
							<button name="id" value={product.id} class="btn btn-square">
								<TrashIcon class="size-4" />
							</button>
						</form>
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
