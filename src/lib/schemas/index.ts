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
		unitSize: z.string(),
		code: z.string().optional(),
		link: z.string().optional()
	})
)

export const quotationSchema = z.object({
	id: z.string(),
	number: z.number().positive(),
	credit: z.number().positive().optional().nullable(),
	includeIgv: z.boolean(),
	deadline: z
		.number({
			message: 'Fecha de entrega debe ser mayor a 0'
		})
		.positive({
			message: 'Fecha de entrega ser mayor a 0'
		}),
	isPaymentPending: z.boolean(),
	customerId: z.string().optional().nullable(),
	items: quotationItemSchema.nonempty({
		message: 'Debes agregar al menos un producto'
	}),
	customer: z
		.object({
			name: z.string().optional(),
			ruc: z.string().optional(),
			address: z.string().optional(),
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

// id: '',
// dniRuc: '',
// recipient: '',
// destination: '',
// observations: '',
// phone: '',
// agencyId: '1307f184-318e-4292-b603-23dc66e7f03e',
//    address: '',
//    agency: {
//      address: '',
//      createdAt: '',
//      id: '',
//      name: '',
//      phone: '',
//      ruc: '',
//      updatedAt: ''
//    }
export const labelSchema = z.object({
	id: z.string(),
	dniRuc: z.coerce.string().nonempty(),
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
