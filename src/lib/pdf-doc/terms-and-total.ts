import { type QuotationClient } from '$lib/types'

import { getIgv } from '$lib/utils'
import type { Content, Table } from 'pdfmake/interfaces'
import { COLORS } from './constants'

export function getTermAndTotal(quotation: QuotationClient) {
	const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(quotation.items)

	const content: Content = {
		columns: [
			{
				text: ''
			},
			{
				marginLeft: 30,
				table: {
					widths: ['*', 80],
					body: [
						[
							{
								text: 'Descuentos',
								alignment: 'right'
							},
							{
								text: '- S/ 0.00',
								alignment: 'right'
							}
						],

						[
							{
								text: 'Sub Total Ventas Gravadas',
								alignment: 'right'
							},
							{
								text: quotation.includeIgv ? formatedSubTotal : 'S/ 0.00',
								alignment: 'right'
							}
						],

						[
							{
								text: 'IGV (18%)',
								alignment: 'right'
							},
							{
								text: quotation.includeIgv ? formatedIgv : 'S/ 0.00',
								alignment: 'right'
							}
						],
						[
							{
								border: [true, true, false, true],
								borderColor: COLORS.PRIMARY,
								text: [
									{
										text: quotation.includeIgv ? 'IMPORTE TOTAL' : 'TOTAL',
										bold: true
									},
									{
										text: quotation.includeIgv ? '' : ' (No Incluye IGV)',
										fontSize: 8,
										color: COLORS.PRIMARY,
										bold: true
									}
								],
								alignment: 'right',
								fontSize: 10
							},
							{
								border: [false, true, true, true],
								text: formatedTotal,
								alignment: 'right',
								bold: true,
								fontSize: 10
							}
						]
					]
				},
				layout: {
					defaultBorder: false
				}
			}
		]
	}

	return content
}
