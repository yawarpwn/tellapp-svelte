export type { QuotationClient, CreateQuotationClient, UpdateQuotationClient } from '$lib/schemas'
import {
	createProductSchema,
	updateProductSchema,
	productSchema,
	createLabelSchema,
	labelSchema,
	updateLabelSchema
} from '$lib/schemas'
import type { z } from 'zod'
// type Prettyfy<T> = {
// 	[K in keyof T]: T[K];
// };

export type CustomerFromService = {
	id?: string
	ruc: string
	name: string
	address?: string
	isRegular: boolean
}

export type QuotationCustomer = Pick<Customer, 'name' | 'address' | 'ruc' | 'isRegular'>

//------------------------- Customer ---------------------------------------->
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

export type QuotationItem = {
	id: string
	description: string
	price: number
	cost?: number
	link?: string | null
	qty: number
	// code: string
	unitSize: string
}
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

export type Agency = {
	id: string
	name: string
	ruc: string
	phone: string
	address: string
	createdAt: string
	updatedAt: string
}

export type CreateAgency = Omit<Agency, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateAgency = Partial<CreateAgency>

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
	publicId: string
	format: string
	createdAt: string
	updatedAt: string
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

export type Product = z.infer<typeof productSchema>
export type InsertProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
