<script lang="ts">
	import type { ActionData, PageData, PageProps } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'
	import { toast } from 'svelte-sonner'
	import { FileIcon, FilePlusIcon, FilesIcon } from 'lucide-svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'

	const { data, form }: PageProps = $props()

	$effect(() => {
		if (form?.error) {
			toast(form.error)
		}
	})
</script>

<Breadcrumbs
	breadcrumbs={[
		{ label: 'Cotizaciones', href: '/quotations', icon: FilesIcon },
		{ label: 'Crear', icon: FilePlusIcon }
	]}
/>
<CreateUpdateQuotation
	quotation={undefined}
	productsPromise={data.productsPromise}
	customersPromise={data.customersPromise}
/>
