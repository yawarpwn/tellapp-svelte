export type { QuotationClient, CreateQuotationClient, UpdateQuotationClient } from '$lib/schemas'
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

// export type QuotationClient = {
// 	id: string
// 	number: number
// 	deadline: number
// 	credit?: number | null
// 	includeIgv: boolean
// 	isPaymentPending: boolean
// 	items: QuotationItem[]
// 	createdAt: string
// 	updatedAt: string
// 	customer?: Omit<Customer, 'createdAt' | 'updatedAt' | 'id'> | null
// 	customerId?: string | null
// }

// export type CreateQuotationClient = Omit<
// 	QuotationClient,
// 	'id' | 'number' | 'createdAt' | 'updatedAt'
// > & {
// 	id: string | undefined
// }

// export type UpdateQuotationClient = Partial<CreateQuotationClient> & {
// 	id: string
// }

export type QuotationCustomer = Pick<Customer, 'name' | 'address' | 'ruc' | 'isRegular'>

// ------------------------- Products --------------------------------------->
export type Product = {
	id: string
	description: string
	code: string
	unitSize: string
	category: string
	link: string
	rank: number
	price: number
	cost: number
	createdAt: string
	updatedAt: string
}
export type InsertProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateProduct = Partial<InsertProduct> & { id: string }
export type ProductCategory = {
	id: string
	name: string
	createdAt: string
	updatedAt: string
}

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
export type LabelType = {
	id: string
	recipient: string
	destination: string
	dniRuc: string
	phone: string
	address: string
	observations: string
	agencyId?: string | null
	createdAt: string
	updatedAt: string
	agency: Agency
}

export type CreateLabel = Omit<LabelType, 'id' | 'createdAt' | 'updatedAt' | 'agency'>
export type UpdateLabel = Partial<CreateLabel>

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
