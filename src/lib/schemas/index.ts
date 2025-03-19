import { z } from 'zod'

export const quotationItemSchema = z.array(
	z.object({
		id: z.string(),
		qty: z.number(),
		price: z.number(),
		cost: z.number().optional(),
		description: z.string(),
		code: z.string().optional()
	})
)

export const createQuotationSchema = z.object({
	credit: z.number().optional(),
	includeIgv: z.boolean().default(false),
	deadline: z.number(),
	isPaymentPending: z.boolean().default(false),
	customerId: z.string().optional(),
	items: quotationItemSchema,
	customer: z
		.object({
			id: z.string().optional(),
			name: z.string().optional(),
			ruc: z.string().optional(),
			address: z.string().optional(),
			isRegular: z.boolean().default(false)
		})
		.optional()
})
