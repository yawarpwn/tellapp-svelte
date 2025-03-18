<script lang="ts">
	import type { PageProps } from './$types'
	import CreateUpdateQuotation from '$lib/components/CreateUpdateQuotation.svelte'
	import { toast } from 'svelte-sonner'
	import { FilePlusIcon, FilesIcon } from 'lucide-svelte'
	import {
		setQuotationContext,
		getQuotationContext,
		INITIAL_QUOTATION_STATE
	} from '$lib/contexts/quotation.svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import { QUOTATIONS_KEY } from '$lib/constants'
	import type { CreateQuotationClient } from '$lib/types'
	import Dialog from '$lib/components/ui/Dialog.svelte'
	import compare from 'just-compare'

	const { data, form }: PageProps = $props()

	$effect(() => {
		if (form?.error) {
			toast(form.error)
		}
	})

	let showRecuperationDialog = $state(false)

	function closeRecuperationDialog() {
		showRecuperationDialog = false
	}

	setQuotationContext()
	const { setQuotation, reset, store } = getQuotationContext()

	// Efecto para recuperar la cotizacion desde el LocalStorage
	$effect(() => {
		const savedQuotation = localStorage.getItem(QUOTATIONS_KEY)
		if (savedQuotation) {
			showRecuperationDialog = true
			const parsedQuotation = JSON.parse(savedQuotation) as CreateQuotationClient
			setQuotation(parsedQuotation)
		}
	})

	//Efecto para guardar la cotizacion en localStorage
	$effect(() => {
		const quotationRaw = {
			id: store.quotation.id,
			credit: store.quotation.credit,
			deadline: store.quotation.deadline,
			isPaymentPending: store.quotation.isPaymentPending,
			customerId: store.quotation.customerId,
			includeIgv: store.quotation.includeIgv,
			items: store.quotation.items,
			customer: store.quotation.customer
		}
		//Guarda solo si tiene cambios
		if (!compare(INITIAL_QUOTATION_STATE, quotationRaw)) {
			console.log('save quo ...')
			localStorage.setItem(QUOTATIONS_KEY, JSON.stringify(store.quotation))
		}
	})
</script>

{#if showRecuperationDialog}
	<Dialog bind:showModal={showRecuperationDialog} closeModal={closeRecuperationDialog}>
		<div class="flex flex-col gap-4">
			<h2 class="text-center font-bold">Recuperar Cotización</h2>
			<p class="text-center">¿Deseas recuperado una cotización NO GUADADA</p>
			<div class="flex justify-between">
				<button
					onclick={() => {
						closeRecuperationDialog()
						reset()
					}}
					class="btn">Cancelar</button
				>
				<button
					onclick={() => {
						closeRecuperationDialog()
					}}
					class="btn btn-primary">Aceptar</button
				>
			</div>
		</div>
	</Dialog>
{/if}
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
