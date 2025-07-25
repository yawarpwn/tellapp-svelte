import { z } from 'zod'

export const quotationItemSchema = z.object({
	id: z.string(),
	description: z.string(),
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
		.optional()
		.nullable(),
	unitSize: z.string(),
	link: z.string().optional().nullable()
})

export const quotationSchema = z.object({
	id: z.string(),
	number: z.number().positive(),
	credit: z.number().positive().optional().nullable(),
	includeIgv: z.boolean(),
	validityDays: z.number().optional().nullable(),
	observations: z.string().optional().nullable(),
	standardTerms: z.array(z.string()),
	deadline: z
		.number({
			message: 'Fecha de entrega debe ser mayor a 0'
		})
		.positive({
			message: 'Fecha de entrega ser mayor a 0'
		}),
	isPaymentPending: z.boolean(),
	customerId: z.string().optional().nullable(),
	items: z.array(quotationItemSchema),
	customer: z
		.object({
			name: z.string().optional().nullable(),
			ruc: z.string().optional().nullable(),
			address: z.string().optional().nullable(),
			isRegular: z.boolean().default(false)
		})
		.optional()
		.nullable(),
	createdAt: z.string(),
	updatedAt: z.string()
})

export const createQuotationSchema = quotationSchema.omit({
	id: true,
	number: true,
	createdAt: true,
	updatedAt: true
})

export const updateQuotationSchema = createQuotationSchema.partial()

//-------------------------Product Schema -------------------------------------\\
export const productSchema = z.object({
	id: z.string(),
	description: z.string(),
	code: z.string(),
	price: z.coerce.number().positive(),
	cost: z.coerce.number().positive(),
	unitSize: z.string(),
	link: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
	category: z.string(),
	categoryId: z.coerce.number()
})

export const createProductSchema = productSchema.omit({
	id: true,
	category: true,
	createdAt: true,
	updatedAt: true
})

export const updateProductSchema = createProductSchema.partial()

//-------------------------Product Schema -------------------------------------\\
export const labelSchema = z.object({
	id: z.string(),
	dniRuc: z
		.string()
		.nonempty()
		.refine(
			(value) => {
				if (value.length === 8 || value.length === 11) {
					return true
				}
				return false
			},
			{ message: 'Ruc o Dni debe ser de 8 digitos o 11 digitos' }
		),
	recipient: z.string().nonempty(),
	destination: z.string().nonempty(),
	observations: z.string().optional(),
	phone: z.coerce.string(),
	agencyId: z.string().optional(),
	address: z.string().optional(),
	agency: z.object({
		address: z.string(),
		id: z.string(),
		name: z.string(),
		phone: z.string(),
		ruc: z.string(),
		updatedAt: z.string(),
		createdAt: z.string()
	}),
	createdAt: z.string(),
	updatedAt: z.string()
})

export const createLabelSchema = labelSchema.omit({
	agency: true,
	id: true,
	createdAt: true,
	updatedAt: true
})

export const updateLabelSchema = createLabelSchema.partial()

//-------------------------Agency Schema -------------------------------------\\
export const agencySchema = z.object({
	id: z.string(),
	ruc: z.coerce.string().nonempty(),
	name: z.string(),
	phone: z.coerce.string(),
	address: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string()
})

export const createAgencySchema = agencySchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export const updateAgencySchema = createAgencySchema.partial()
