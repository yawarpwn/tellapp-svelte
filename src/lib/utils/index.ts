export * from './classname'
export * from './promises'
export * from './format'
export * from './quotation'
export * from './promises'

export const getPaymentCodition = (paymentCodition: string, credit?: number | null) => {
	if (paymentCodition === 'FULL_PREPAYMENT') return 'Contado Previo Depósito'
	if (paymentCodition === 'CREDIT') return `Crédito ${credit} días`
	if (paymentCodition === 'ADVANCE_20') return 'Anticipo Mínimo 20%'
	if (paymentCodition === 'ADVANCE_80') return 'Anticipo Mínimo 80%'
	return 'Anticipo Mínimo 50%'
}
