import { BASE_URL } from '$lib/constants'
import type {
	Agency,
	CreateAgency,
	CreateLabel,
	CreateQuotationClient,
	Customer,
	CustomerFromService,
	DataResponse,
	InsertProduct,
	LabelType,
	Product,
	ProductCategory,
	QuotationClient,
	UpdateCustomer,
	UpdateLabel,
	UpdateProduct,
	UpdateQuotationClient,
	UpdateWatermark,
	Watermark,
	Signal,
	SignalCategory
} from '$lib/types'
import { fetchData } from '$lib/utils'

//----------------------------- Quotations ----------------------------->
type FetchQuotationQueryParams = {
	query?: string
	page: string
	limit?: number
}
export async function fetchQuotations(
	apiKey: string,
	queryParams?: FetchQuotationQueryParams
): Promise<DataResponse<QuotationClient>> {
	console.info('fetch quotations --->')
	const { query = '', page = 1, limit = 20 } = queryParams ?? {}
	const url = `${BASE_URL}/api/quotations?q=${query}&page=${page}&limit=${limit}`
	const data = await fetchData<DataResponse<QuotationClient>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})

	return data
}

export async function fetchQuotaitonByNumber(quotationNumber: number, apiKey: string) {
	const url = `${BASE_URL}/api/quotations/${quotationNumber}`
	const data = await fetchData<QuotationClient>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function deleteQuotation(quotationNumber: number, apiKey: string) {
	const url = `${BASE_URL}/api/quotations/${quotationNumber}`
	const data = await fetchData<Customer>(url, {
		method: 'DELETE',
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function createQuotation(newQuotation: CreateQuotationClient, apiKey: string) {
	const url = `${BASE_URL}/api/quotations`
	const data = await fetchData<{ insertedNumber: number }>(url, {
		method: 'POST',
		body: JSON.stringify(newQuotation),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})

	return data.insertedNumber
}

export async function updateQuotation(
	quotationToUpdate: UpdateQuotationClient,
	quotationId: string,
	apiKey: string
) {
	const url = `${BASE_URL}/api/quotations/${quotationId}`
	const updateQuotation = await fetchData<QuotationClient>(url, {
		method: 'PUT',
		body: JSON.stringify(quotationToUpdate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})

	return updateQuotation
}

export async function duplicateQuotation(quotationNumber: number, apiKey: string) {
	const quotation = await fetchQuotaitonByNumber(quotationNumber, apiKey)
	const insertedQuotationNumber = await createQuotation(
		{
			...quotation
		},
		apiKey
	)
	return insertedQuotationNumber
}

type FetchCustomerOptions = {
	onlyRegular?: boolean
}

//----------------------------- Customers ----------------------------->
export async function fetchCustomers(
	apiKey: string,
	options?: FetchCustomerOptions
): Promise<Customer[]> {
	console.info('fetch customers --->')
	const { onlyRegular = false } = options ?? {}
	const url = `${BASE_URL}/api/customers${onlyRegular ? '?onlyRegular=true' : ''}`
	const data = await fetchData<DataResponse<Customer>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})

	return data.items
}

export async function searchCustomerByDniOrRuc(dniRuc: string, apiKey: string) {
	//Search customer in Database
	const url = `${BASE_URL}/api/customers/search/${dniRuc}`
	const customer = await fetchData<CustomerFromService>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})

	return customer
}

export async function fetchCustomerById(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/customers/${id}`
	const data = fetchData<Customer>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function updateCustomer(id: string, customerToUpdate: UpdateCustomer, apiKey: string) {
	const url = `${BASE_URL}/api/customers/${id}`
	const data = await fetchData<Customer>(url, {
		method: 'PUT',
		body: JSON.stringify(customerToUpdate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

//----------------------------- Products ----------------------------->
export async function fetchProducts(apiKey: string): Promise<Product[]> {
	console.info('fetch products --->')
	const url = `${BASE_URL}/api/products`
	const data = await fetchData<DataResponse<Product>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data.items
}

export async function fetchProductById(id: string, apiKey: string): Promise<Product> {
	const url = `${BASE_URL}/api/products/${id}`
	const data = await fetchData<Product>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function fetchProductCategories(apiKey: string) {
	const url = `${BASE_URL}/api/product-categories`
	const data = await fetchData<DataResponse<ProductCategory>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data.items
}

export async function createProduct(productToInsert: InsertProduct, apiKey: string) {
	const url = `${BASE_URL}/api/products`
	const data = await fetchData<Product>(url, {
		method: 'POST',
		body: JSON.stringify(productToInsert),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function updateProduct(id: string, productToUpdate: UpdateProduct, apiKey: string) {
	const url = `${BASE_URL}/api/products/${id}`
	const updatedProduct = await fetchData<Product>(url, {
		method: 'PUT',
		body: JSON.stringify(productToUpdate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})

	return updatedProduct
}

export async function deleteProduct(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/products/${id}`
	const data = await fetchData<Product>(url, {
		method: 'DELETE',
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

//----------------------------- Agencies ----------------------------->
export async function fetchAgencies(apiKey: string): Promise<Agency[]> {
	const url = `${BASE_URL}/api/agencies`
	const data = await fetchData<DataResponse<Agency>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data.items
}

export async function fetchAgencyById(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/agencies/${id}`
	const data = await fetchData<Agency>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function createAgency(agencyToCreate: CreateAgency, apiKey: string) {
	const url = `${BASE_URL}/api/agencies`
	const data = await fetchData<Agency>(url, {
		method: 'POST',
		body: JSON.stringify(agencyToCreate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function updateAgency(id: string, agencyToUpdate: Agency, apiKey: string) {
	const url = `${BASE_URL}/api/agencies/${id}`
	const data = await fetchData<Agency>(url, {
		method: 'PUT',
		body: JSON.stringify(agencyToUpdate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function deleteAgency(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/agencies/${id}`
	const data = await fetchData<Agency>(url, {
		method: 'DELETE',
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

//----------------------------- Labels ----------------------------->
export async function fetchLabels(apiKey: string): Promise<LabelType[]> {
	const url = `${BASE_URL}/api/labels`
	const data = await fetchData<DataResponse<LabelType>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data.items
}

export async function fetchLabelById(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/labels/${id}`
	const data = await fetchData<LabelType>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function createLabel(labelToCreate: CreateLabel, apiKey: string) {
	const url = `${BASE_URL}/api/labels`
	const data = await fetchData<LabelType>(url, {
		method: 'POST',
		body: JSON.stringify(labelToCreate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function updateLabel(id: string, labelToUpdate: UpdateLabel, apiKey: string) {
	const url = `${BASE_URL}/api/labels/${id}`
	const data = await fetchData<LabelType>(url, {
		method: 'PUT',
		body: JSON.stringify(labelToUpdate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function deleteLabel(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/labels/${id}`
	const data = await fetchData<LabelType>(url, {
		method: 'DELETE',
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

//----------------------------- Watermarks -----------------------------\\
export async function fetchWatermarks(apiKey: string): Promise<Watermark[]> {
	const url = `${BASE_URL}/api/watermarks`
	const data = await fetchData<DataResponse<Watermark>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data.items.map((photo) => ({
		...photo,
		// watermarkedUrl: photo.url.replace(/v\d+/, 'fl_layer_apply,l_watermark-tellsenales')
		watermarkedUrl: `https://res.cloudinary.com/tellsenales-cloud/image/upload/l_watermark-tellsenales/c_limit,w_0.75/fl_layer_apply/${photo.publicId}.webp`
	}))
}

export async function fetchWatermarkById(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/watermarks/${id}`
	const data = await fetchData<Watermark>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function createWatermark(formData: FormData, apiKey: string) {
	const url = `${BASE_URL}/api/watermarks`
	const data = await fetchData<Watermark>(url, {
		method: 'POST',
		body: formData,
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function updateWatermarkl(id: string, labelToUpdate: UpdateWatermark, apiKey: string) {
	const url = `${BASE_URL}/api/watermarks/${id}`
	const data = await fetchData<Watermark>(url, {
		method: 'PUT',
		body: JSON.stringify(labelToUpdate),
		headers: {
			'Content-Type': 'application/json',
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function deleteWatermark(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/watermarks/${id}`
	const data = await fetchData<Watermark>(url, {
		method: 'DELETE',
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

//----------------------------- Signals -----------------------------\

export async function fetchSignals(apiKey: string): Promise<Signal[]> {
	const url = `${BASE_URL}/api/signals`
	const data = await fetchData<DataResponse<Signal>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})

	//res.cloudinary.com/tellsenales-cloud/image/upload/c_thumb,w_200/v1/signals/jmkpwcwuyu2wciaahnx6.webp?_a=BAMABkcc0
	return data.items.map((photo) => ({
		...photo,
		thumbUrl: photo.url.replace(/v\d+/, 'c_thumb,w_80')
		// watermarkedUrl: photo.url.replace(/v\d+/, 'fl_layer_apply,l_watermark-tellsenales')
		// watermarkedUrl: `https://res.cloudinary.com/tellsenales-cloud/image/upload/l_watermark-tellsenales/c_limit,w_0.75/fl_layer_apply/${photo.publicId}.webp`
	}))
}

export async function createSignal(formData: FormData, apiKey: string) {
	const url = `${BASE_URL}/api/signals`
	const data = await fetchData<Signal>(url, {
		method: 'POST',
		headers: {
			'TELL-API-KEY': apiKey
		},
		body: formData
	})
	return data
}

export async function updateSignal(formData: FormData, apiKey: string, id: string) {
	const url = `${BASE_URL}/api/signals/${id}`
	const data = await fetchData<Signal>(url, {
		method: 'PUT',
		headers: {
			'TELL-API-KEY': apiKey
		},
		body: formData
	})
	return data
}

export async function deleteSignal(id: string, apiKey: string) {
	const url = `${BASE_URL}/api/signals/${id}`
	const data = await fetchData<Signal>(url, {
		method: 'DELETE',
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data
}

export async function fetchSingalCategories(apiKey: string) {
	const url = `${BASE_URL}/api/signal-categories`
	const data = await fetchData<DataResponse<SignalCategory>>(url, {
		headers: {
			'TELL-API-KEY': apiKey
		}
	})
	return data.items
}
//----------------------------- Auth -----------------------------\

class AuthError extends Error {}
export async function login({ email, password }: { email: string; password: string }) {
	const url = `${BASE_URL}/auth/login`

	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: { 'Content-Type': 'application/json' }
	})

	if (res.status === 403) {
		throw new AuthError('Email o contraseña incorrectos')
	}

	if (!res.ok) {
		throw new Error('Error en el servidor')
	}

	const data = (await res.json()) as { token: string }
	return data
}
