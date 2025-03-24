<script lang="ts">
	import { CirclePlusIcon, SearchIcon, XIcon } from 'lucide-svelte'
	import type { PageProps } from './$types'
	import CreateUpdateLabelDialog from '$lib/components/CreateUpdateLabelDialog.svelte'
	import { toast } from 'svelte-sonner'
	import LabelList from '$lib/components/LabelList.svelte'

	let { data, form = $bindable() }: PageProps = $props()

	let searchTerm = $state('')
	let open = $state(false)
	let selectedId = $state<null | string>(null)
	const labelToEdit = $derived(data.labels.find((p) => p.id === selectedId))

	function onEdit(id: string) {
		open = true
		selectedId = id
	}

	const filteredLabels = $derived(
		data.labels.filter((p) => {
			const results =
				p.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
				p.recipient.toLowerCase().includes(searchTerm.toLowerCase())
			return results
		})
	)

	$effect(() => {
		console.log('form', form)
		if (form?.error) {
			toast.error(JSON.stringify(form.error))
			return
		}

		if (form?.success) {
			toast.success(form.message)
		}
	})

	let timeoutid: ReturnType<typeof setTimeout>
</script>

{#if open}
	<CreateUpdateLabelDialog
		agencies={data.agencies}
		closeModal={() => {
			open = false
			selectedId = null
		}}
		bind:open
		{labelToEdit}
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
	<LabelList {onEdit} labels={filteredLabels.slice(0, 20)} />
</div>
