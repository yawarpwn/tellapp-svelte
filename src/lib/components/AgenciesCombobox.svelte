<script lang="ts">
	import Combobox from '$lib/components/ui/Combobox.svelte'
	import type { Agency } from '$lib/types'
	type Props = {
		agencies: Agency[]
		agencyId?: string
		agencyName?: string
	}
	let { agencies, agencyId = $bindable(), agencyName }: Props = $props()
	const items = agencies.map((a) => ({ value: a.id, label: a.name }))
</script>

<Combobox
	name="agencyId"
	bind:value={agencyId}
	inputProps={{
		defaultValue: agencyName
	}}
	onValueChange={(value) => (agencyId = value)}
	{items}
	type="single"
></Combobox>
