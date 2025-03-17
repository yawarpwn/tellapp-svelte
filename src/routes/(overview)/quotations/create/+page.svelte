<script lang="ts">
	import type { ActionData, PageData, PageProps } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'
	import { toast } from 'svelte-sonner'
	import { FileIcon, FilePlusIcon, FilesIcon } from 'lucide-svelte'
	import { setQuotationContext } from '$lib/contexts/quotation.svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import { QUOTATIONS_KEY } from '$lib/constants'
	import type { CreateQuotationClient } from '$lib/types'

	const { data, form }: PageProps = $props()

	$effect(() => {
		if (form?.error) {
			toast(form.error)
		}
	})

	setQuotationContext(undefined)

	$effect(() => {
		const savedQuotation = localStorage.getItem(QUOTATIONS_KEY)
		if (savedQuotation) {
			const parsedQuotation = JSON.parse(savedQuotation) as CreateQuotationClient
			setQuotationContext(parsedQuotation)
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
	productsPromise={data.productsPromise}
	customersPromise={data.customersPromise}
/>
