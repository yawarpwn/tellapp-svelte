<script lang="ts">
	import type { QuotationClient } from '$lib/types'
	import { generateQuotationPdf } from '$lib/pdf-doc/generate-quotation-pdf'
	import * as pdfMake from 'pdfmake/build/pdfmake'
	import 'pdfmake/build/vfs_fonts'
	import { DownloadIcon, Share2Icon } from 'lucide-svelte'

	type Props = {
		quotation: QuotationClient
	}
	const { quotation }: Props = $props()

	const formatDate = (date: string | Date) => {
		return Intl.DateTimeFormat('es-PE').format(new Date(date)).replace(/\//g, '-')
	}

	const getCustomerName = (name?: string) => {
		if (!name) return ''
		return name.toUpperCase().replace(/\./g, '').replace(/ /, '-')
	}

	const getQuotationPdfName = (quotation: QuotationClient) => {
		const date = formatDate(quotation.updatedAt)
		const customerName = getCustomerName(quotation?.customer?.name) || `-${date}-SIN-RUC`
		const isUpdate = Number(quotation.updatedAt) > Number(quotation.createdAt)
		const updatePrefix = isUpdate ? '-ACTUALIZADO' : ''
		return `${quotation.number}-COT-${customerName}${updatePrefix}.pdf`
	}

	const pdfFileName = getQuotationPdfName(quotation)

	const handleSharePdf = async () => {
		// Comprobar si el navegador admite la API navigator.share
		if (!navigator.share) {
			console.log('Share api no supported')
			return
		}

		const documentDefinition = generateQuotationPdf(quotation)
		const pdfDoc = pdfMake.createPdf(documentDefinition)

		const blob = await new Promise<Blob>((resolve) => {
			pdfDoc.getBlob((blob) => resolve(blob))
		})

		// Usar la API navigator.share para compartir el Blob del PDF
		try {
			await navigator.share({
				files: [
					new File([blob], pdfFileName, {
						type: 'application/pdf'
					})
				],
				title: `Cotización ${quotation.number}`,
				text: '¡Echa un vistazo a esta cotización!'
			})
		} catch (error) {
			console.log('Error al interntar compartir', error)
		}
	}

	const downloadPdf = () => {
		const documentDefinition = generateQuotationPdf(quotation)
		const pdfDoc = pdfMake.createPdf(documentDefinition)
		pdfDoc.download(pdfFileName)
	}
</script>

<button onclick={downloadPdf}>
	<DownloadIcon size={20} />
	<span class="hidden lg:block">Descargar</span>
</button>

<button onclick={handleSharePdf}>
	<Share2Icon size={20} />
	<span class=" hidden lg:block">Compartir</span>
</button>
