import { z } from 'zod'

export const quotationItemSchema = z.array(
	z.object({
		id: z.string(),
		qty: z.number().positive({
			message: 'La cantidad debe ser mayor a 0'
		}),
		price: z.number().positive({
			message: 'El precio debe ser mayor a 0'
		}),
		cost: z
			.number()
			.positive({
				message: 'El costo debe ser mayor a 0'
			})
			.optional(),
		description: z.string(),
		code: z.string().optional()
	})
)

export const createQuotationSchema = z.object({
	credit: z.number().positive().optional(),
	includeIgv: z.boolean().default(false),
	deadline: z
		.number({
			message: 'Fecha de entrega debe ser mayor a 0'
		})
		.positive({
			message: 'Fecha de entrega ser mayor a 0'
		}),
	isPaymentPending: z.boolean().default(false),
	customerId: z.string().optional(),
	items: quotationItemSchema.nonempty({
		message: 'Debes agregar al menos un producto'
	}),
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
