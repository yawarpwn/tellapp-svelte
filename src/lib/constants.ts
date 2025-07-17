import { browser, building, dev, version } from '$app/environment'

export const PRODUCTION_URL = 'https://app.tellsenales.workers.dev'
// export const BASE_URL = 'https://api.tellsignals.workers.dev/v2'
export const BASE_URL = dev ? 'http://localhost:8787/v2' : 'https://api.tellsignals.workers.dev/v2'

export const PRODUCT_CATEGORIES = {
	CINTAS_SEGURIDAD: 'cintas seguridad',
	OBRAS: 'obras',
	PROTECCION_VIAL: 'proteccion vial',
	FOTOLUMINISCENTE: 'fotoluminiscente',
	SEGURIDAD: 'seguridad',
	VIALES: 'viales',
	VINILES: 'viniles',
	LUCHA_CONTRA_INCENDIO: 'lucha contra incendio',
	ARTICULOS_SEGURIDAD: 'articulos seguridad',
	EPP: 'epp',
	SERVICIO: 'servicio',
	ROPA_SEGURIDAD: 'ropa seguridad',
	CONVENCIONALES: 'convencionales',
	ACRILICOS: 'acrilicos'
}

export const PRODUCT_CATEGORIES_TABLE = {
	CINTAS_SEGURIDAD: 1,
	OBRAS: 2,
	PROTECCION_VIAL: 3,
	FOTOLUMINISCENTE: 4,
	SEGURIDAD: 5,
	VIALES: 6,
	VINILES: 7,
	LUCHA_CONTRA_INCENDIO: 8,
	ARTICULOS_SEGURIDAD: 9,
	EPP: 10,
	SERVICIO: 11,
	ROPA_SEGURIDAD: 12,
	CONVENCIONALES: 13,
	ACRILICOS: 14
} as const

export const PRODUCTS_KEY = '__TELL_PRODUCTS__'
export const CUSTOMERS_KEY = '__TELL_CUSTOMERS__'
export const QUOTATIONS_KEY = '__QUOS__'
export const SAVED_QUOTATION_KEY = '__TELL_SAVED_QUOTATION__'
