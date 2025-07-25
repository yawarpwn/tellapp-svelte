<script lang="ts">
	import * as pdfMake from 'pdfmake/build/pdfmake'
	import 'pdfmake/build/vfs_fonts'
	import { generateCertificateExtintorPdf } from '$lib/pdf-doc/generate-certificate-exintor-pdf'
	import SearchCustomer from './Search.svelte'

	const today = new Date()
	const expirationDate = today.setFullYear(today.getFullYear() + 1)
	let data = $state({
		type: 'PQS',
		ruc: '',
		company: '',
		address: '',
		model: 'NACIONAL',
		serie: '',
		brand: 'MERRIK',
		capacity: '',
		expirationDate: expirationDate,
		createdDate: today
	})

	$inspect(data)

	import { DownloadIcon, Share2Icon } from 'lucide-svelte'
	import type { Customer } from '$lib/types'

	//
	// const handleSharePdf = async () => {
	// 	// Comprobar si el navegador admite la API navigator.share
	// 	if (!navigator.share) {
	// 		console.log('Share api no supported')
	// 		return
	// 	}
	//
	// 	const documentDefinition = generateQuotationPdf(quotation)
	// 	const pdfDoc = pdfMake.createPdf(documentDefinition)
	//
	// 	const blob = await new Promise<Blob>((resolve) => {
	// 		pdfDoc.getBlob((blob) => resolve(blob))
	// 	})
	//
	// 	// Usar la API navigator.share para compartir el Blob del PDF
	// 	try {
	// 		await navigator.share({
	// 			files: [
	// 				new File([blob], pdfFileName, {
	// 					type: 'application/pdf'
	// 				})
	// 			],
	// 			title: `Cotización ${quotation.number}`,
	// 			text: '¡Echa un vistazo a esta cotización!'
	// 		})
	// 	} catch (error) {
	// 		console.log('Error al interntar compartir', error)
	// 	}
	// }
	//
	const downloadPdf = async () => {
		const dd = await generateCertificateExtintorPdf(data)
		const pdfDoc = pdfMake.createPdf(dd)
		pdfDoc.download()
	}

	let loading = $state(false)

	// async function searchCustomer() {
	// 	loading = true
	// 	try {
	// 		const res = await fetch(`/api/search-customer/${data.ruc}`)
	// 		const data = (await res.json()) as { customer: Customer }
	//
	//
	// 		toast.success(`${data.dniRuc}`, {
	// 			description: data.customer.name
	// 		})
	// 	} catch (error) {
	// 		toast.error(`${label.dniRuc}`, {
	// 			description: 'Ruc NO encontrado en base de datos'
	// 		})
	// 	} finally {
	// 		loading = false
	// 	}
	// }
</script>

<svelte:head>
	<title>Certificados</title>
</svelte:head>

<h1 class="text-center text-3xl font-bold text-orange-500">Certificados Extintores</h1>
<form>
	<div class="flex flex-col gap-4">
		<div class="col-span-12 grid gap-1 lg:col-span-6">
			<label class="label text-sm" for="customer.name">Ruc</label>
			<div class="input w-full">
				<input bind:value={data.ruc} class="" type="text" />
				<SearchCustomer
					onSearchCustomer={(customer) => {
						data.ruc = customer.ruc
						data.address = customer.address ?? ''
						data.company = customer.name
					}}
					dniRuc={data.ruc}
				/>
				<span class="badge badge-neutral badge-xs">Opcional</span>
			</div>
		</div>
		<div class="col-span-12 grid gap-1 lg:col-span-6">
			<label class="label text-sm" for="customer.name"> Razón Social / Nombre Cliente </label>
			<div class="input w-full">
				<input bind:value={data.company} class="" type="text" />
				<span class="badge badge-neutral badge-xs">Opcional</span>
			</div>
		</div>

		<div class="col-span-12 grid gap-1 lg:col-span-6">
			<label class="label text-sm" for="customer.name"> Dirección </label>
			<div class="input w-full">
				<input bind:value={data.address} class="" type="text" />
				<span class="badge badge-neutral badge-xs">Opcional</span>
			</div>
		</div>

		<div class="col-span-12 grid gap-1 lg:col-span-6">
			<label class="label text-sm" for="customer.name"> Tipo </label>
			<div class="input w-full">
				<input bind:value={data.type} class="" type="text" />
			</div>
		</div>

		<div class="col-span-12 grid gap-1 lg:col-span-6">
			<label class="label text-sm" for="customer.name"> Capacidad </label>
			<div class="input w-full">
				<input bind:value={data.capacity} class="" type="text" />
			</div>
		</div>

		<div class="col-span-12 grid gap-1 lg:col-span-6">
			<label class="label text-sm" for="customer.name"> Serie </label>
			<div class="input w-full">
				<input bind:value={data.serie} class="" type="text" />
			</div>
		</div>
	</div>
</form>

<div class="mt-10">
	<button class="btn btn-secondary w-full" onclick={() => downloadPdf()}>Descargar</button>
</div>
