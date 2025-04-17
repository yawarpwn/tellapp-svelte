<script lang="ts">
	import { CirclePlusIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import CreateUpdateAgencyLabel from '$lib/components/CreateUpdateAgencyDialog.svelte'
	import AgenciesList from '$lib/components/AgenciesList.svelte'
	import type { Agency } from '$lib/types'

	type Props = {
		agencies: Agency[]
	}
	const { agencies }: Props = $props()

	let searchTerm = $state('')
	let open = $state(false)
	let selectedId = $state<null | string>(null)
	const agencyToEdit = $derived(agencies.find((p) => p.id === selectedId))

	function onEdit(id: string) {
		open = true
		selectedId = id
	}

	const filteredagencies = $derived(
		agencies.filter((p) => {
			const results =
				p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				p.ruc.toLowerCase().includes(searchTerm.toLowerCase())
			return results
		})
	)

	let timeoutid: ReturnType<typeof setTimeout>
</script>

{#if open}
	<CreateUpdateAgencyLabel
		closeModal={() => {
			open = false
			selectedId = null
		}}
		bind:open
		{agencyToEdit}
	/>
{/if}

<div class="flex flex-col gap-4">
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
		<button onclick={() => (open = true)} class="btn btn-primary">
			<CirclePlusIcon />
			Crear</button
		>
	</div>
	<AgenciesList {onEdit} agencies={filteredagencies.slice(0, 20)} />
</div>
