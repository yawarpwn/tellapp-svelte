<script lang="ts">
	import { CircleOff, EditIcon, TrashIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	import { CirclePlusIcon, SearchIcon, XIcon } from 'lucide-svelte'
	const { data, form }: PageProps = $props()
	import Fuse from 'fuse.js'
	import CreateUpdateSignalDialog from '$lib/components/CreateUpdateSignalDialog.svelte'
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte'

	const signals = data.signals
	const signalCategories = data.signalCategories

	const search = new Fuse(signals, {
		keys: [
			{
				name: 'code',
				weight: 1
			},

			{
				name: 'title',
				weight: 0.7
			},
			{
				name: 'description',
				weight: 0.3
			}
		],
		threshold: 0.5, // determina la similitud mínima para considerar una coincidencia
		minMatchCharLength: 2, // número mínimo de caracteres para considerar una coincidencia
		includeScore: false //default
	})

	let searchTerm = $state('')
	let open = $state(false)
	let showConfirmDialog = $state(false)
	let selectedId = $state<null | string>(null)
	let selectedCategory = $state('Todos')
	let timeoutid: ReturnType<typeof setTimeout>
	const signalToEdit = $derived(signals.find((p) => p.id === selectedId))

	const filteredSignals = $derived.by(() => {
		let results = signals
		if (searchTerm.trim()) {
			const result = search.search(searchTerm)
			results = result.map((r) => r.item)
		}
		if (selectedCategory !== 'Todos') {
			results = results.filter((p) => p.category === selectedCategory)
		}
		return results
	})

	function openConfirmModal() {}

	function onEdit(id: string) {
		open = true
		selectedId = id
	}

	$inspect({ showConfirmDialog, selectedId })

	$effect(() => {
		console.log({ form })
	})
</script>

{#if open}
	<CreateUpdateSignalDialog
		closeModal={() => {
			open = false
			selectedId = null
		}}
		bind:open
		{signalCategories}
		{signalToEdit}
	/>
{/if}

{#if showConfirmDialog && selectedId && signalToEdit}
	<ConfirmDialog
		dialogTitle="Eliminar señal"
		dialogDescription={signalToEdit.title}
		currentAction="?/delete"
		bind:open={showConfirmDialog}
		{selectedId}
		closeModal={() => {
			selectedId = null
			showConfirmDialog = false
		}}
	/>
{/if}

<div class="flex items-center justify-between">
	<form method="GET" class="relative max-w-[180px] md:max-w-[350px]">
		<label class="input px-2">
			<SearchIcon class="h-[1em] opacity-50" />
			<input
				oninput={(ev) => {
					clearTimeout(timeoutid)
					timeoutid = setTimeout(() => {
						searchTerm = (ev.target as HTMLInputElement).value
					}, 300)
				}}
				value={searchTerm}
				name="q"
				type="search"
				class=""
				placeholder="Buscar..."
			/>
			{#if searchTerm}
				<button
					type="button"
					onclick={() => {
						searchTerm = ''
					}}
					class="bg-base-100 text-base-content/50 hover:text-base-content cusrsor-pointer hover:bg-base-300 absolute right-1 z-10 flex size-6 items-center justify-center rounded-full"
				>
					<XIcon class="h-[1em]" />
				</button>
			{/if}
		</label>
	</form>
	<div class="flex gap-2">
		<select bind:value={selectedCategory} class="select hidden md:block">
			<option selected value="Todos">Todos</option>
			{#each signalCategories as category}
				<option value={category.name}>{category.name}</option>
			{/each}
		</select>
		<button onclick={() => (open = true)} class="btn btn-primary">
			<CirclePlusIcon />
			Crear</button
		>
	</div>
</div>
<div class=" rounded-box border-base-content/5 bg-base-10 flex-col gap-2 overflow-x-auto border">
	<table class="table-zebra table [&_td]:p-2">
		<thead>
			<tr>
				<th>Señal</th>
				<th>Titulo</th>
				<th>Codigo</th>
				<th>Categoria</th>
				<th>Ancho</th>
				<th>Alto</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredSignals as signal (signal.id)}
				<tr>
					<td class="">
						<div class="size-[60px] overflow-hidden">
							<img class="h-full w-full object-contain" src={signal.thumbUrl} />
						</div>
					</td>
					<td>
						{signal.title}
					</td>
					<td class="text-center">
						{signal.code}
					</td>
					<td class="text-center"> categoria </td>
					<td class="text-center">
						{signal.width}
					</td>
					<td class="text-center">
						{signal.height}
					</td>
					<td>
						<div class="flex items-center gap-1">
							<button
								class="btn btn-sm btn-square btn-ghost"
								type="button"
								onclick={() => onEdit(signal.id)}
							>
								<EditIcon class="size-4" />
							</button>
							<button
								onclick={() => {
									showConfirmDialog = true
									selectedId = signal.id
								}}
								class="btn btn-square btn-ghost btn-sm text-error"
							>
								<TrashIcon class="size-4" />
							</button>
						</div>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="7">
						<div class="h-[300px] bg-base-200 flex items-center justify-center gap-4 flex-col">
							<span>Sin Item aún</span>
							<CircleOff size={50} />
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
