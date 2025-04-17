<script lang="ts">
	import PendingInvoicesPage from '$lib/components/PendingInvoicesPage.svelte'
	import type { PageProps } from './$types'
	import { toast } from 'svelte-sonner'
	import DataTableSkeleton from '$lib/components/DataTableSkeleton.svelte'

	let { data, form = $bindable() }: PageProps = $props()

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
</script>

{#await data.agenciesPromise}
	<DataTableSkeleton
		columnCount={4}
		rowCount={20}
		cellWidths={['350px', '300px', '300px', '150px']}
		showSearchbox
	/>
{:then agencies}
	<PendingInvoicesPage {agencies} />
{/await}
