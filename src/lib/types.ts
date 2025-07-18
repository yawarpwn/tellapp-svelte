import {
	createProductSchema,
	updateProductSchema,
	productSchema,
	createLabelSchema,
	labelSchema,
	updateLabelSchema,
	quotationSchema,
	createQuotationSchema,
	updateQuotationSchema,
	quotationItemSchema,
	agencySchema,
	updateAgencySchema,
	createAgencySchema
} from '$lib/schemas'
import type { z } from 'zod'
// type Prettyfy<T> = {
// 	[K in keyof T]: T[K];
// };

//------------------------- Quotations ---------------------------------------->
export type QuotationClient = z.infer<typeof quotationSchema>
export type CreateQuotationClient = z.infer<typeof createQuotationSchema>
export type UpdateQuotationClient = z.infer<typeof updateQuotationSchema>

//------------------------- Customer ---------------------------------------->
export type CustomerFromService = {
	id?: string
	ruc: string
	name: string
	address?: string
	isRegular: boolean
}

export type QuotationCustomer = Pick<Customer, 'name' | 'address' | 'ruc' | 'isRegular'>

export type Customer = {
	id: string
	name: string
	ruc: string
	phone?: null
	address: string
	email?: null
	isRegular: boolean
	createdAt: string
	updatedAt: string
}
export type InsertCustomer = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCustomer = Partial<InsertCustomer>

export type QuotationItem = z.infer<typeof quotationItemSchema>

export type DataResponse<T> = {
	items: T[]
	meta: Meta
}

export type Meta = {
	totalItems: number
}

export type FieldErrorsProps = {
	errors: {
		[key: string]: string[]
	}
	name: string
}

//---------------------------- Agencies  -------------------------------------->

export type Agency = z.infer<typeof agencySchema>
export type CreateAgency = z.infer<typeof createAgencySchema>
export type UpdateAgency = z.infer<typeof updateAgencySchema>

// -------------------------- Labels  --------------------------------------//
export type LabelType = z.infer<typeof labelSchema>
export type CreateLabel = z.infer<typeof createLabelSchema>
export type UpdateLabel = z.infer<typeof updateLabelSchema>

// -------------------------- Watermark  --------------------------------------//
export type Watermark = {
	id: string
	width: number
	height: number
	url: string
	public_id: string
	format: string
	createdAt: string
	updatedAt: string
	thumbUrl: string
	watermarkedUrl: string
}

export type Gallery = {
	id: string
	title: string
	width: number
	height: number
	url: string
	publicId: string
	category_id: string
	format: string
	createdAt: string
	updatedAt: string
	thumbUrl: string
}

export type Signal = {
	id: string
	width: number
	height: number
	url: string
	publicId: string
	format: string
	createdAt: string
	category: string
	updatedAt: string
	categoryId: string
	code: string
	title: string
	description?: string | null
	thumbUrl: string
}

export type CreateWatermark = Omit<Watermark, 'id' | 'createdAt' | 'updatedAt' | 'thumbUrl'>
export type UpdateWatermark = Partial<CreateWatermark>

export type CloudinarySignature = {
	timestamp: number
	signature: string
	apikey: string
	cloudname: string
}

export type ProductCategory = {
	id: number
	name: string
}

export type SignalCategory = {
	id: number
	name: string
}

export type Product = z.infer<typeof productSchema>
export type InsertProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
