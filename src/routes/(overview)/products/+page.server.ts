import {
	createProduct,
	fetchProducts,
	deleteProduct,
	fetchProductCategories,
	updateProduct,
	fetchProductById
} from '$lib/data'
import { trycatch } from '$lib/utils'
import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { createProductSchema, updateProductSchema } from '$lib/schemas'
import type { Product } from '$lib/types'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	// const { data, error } = await trycatch(fetchProducts(platform?.env.TELL_API_KEY!))
	//
	// if (error || !data) {
	// 	return fail(400, { error: 'Interna server error' })
	// }

	const [products, productsCategories] = await Promise.all([
		fetchProducts(platform?.env.TELL_API_KEY!),
		fetchProductCategories(platform?.env.TELL_API_KEY!)
	])
	return {
		metadata: {
			title: 'Productos'
		},
		products,
		productsCategories
	}
}

export const actions = {
	create: async ({ cookies, request, platform }) => {
		console.log('create  product action --->')
		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const result = createProductSchema.safeParse(entries)

		if (!result.success) {
			return fail(403, { error: result.error.flatten().fieldErrors })
		}

		const { data, error } = await trycatch(createProduct(result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			fail(400, { error: 'Internal Server Error' })
		}

		return {
			success: true,
			message: 'Producto Creado correctamente'
		}

		// console.log(formData)
	},

	update: async ({ cookies, request, platform }) => {
		console.log('update product action --->')

		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const id = String(formData.get('id'))
		const result = updateProductSchema.safeParse(entries)

		if (!result.success) {
			return fail(403, { error: result.error.flatten().fieldErrors })
		}

		const { error } = await trycatch(updateProduct(id, result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			return fail(400, { error: 'Internal Server Error' })
		}

		return {
			success: true,
			message: 'Producto editado correctamente'
		}

		// console.log(formData)
	},

	duplicate: async ({ cookies, request, platform }) => {
		console.log('duplicate product action --->')
		const formData = await request.formData()
		const id = String(formData.get('id'))

		if (!id) {
			return fail(400, { error: 'Id del producto requerido para duplicar' })
		}

		const { data: productFond, error: errorProductFond } = await trycatch(
			fetchProductById(id, platform?.env.TELL_API_KEY!)
		)

		if (errorProductFond) {
			return fail(400, { error: 'Interna server error' })
		}

		const { data, error } = await trycatch(
			createProduct(
				{ ...productFond, code: `${productFond.code}-COPY` },
				platform?.env.TELL_API_KEY!
			)
		)

		if (error) {
			return fail(400, { error: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Product duplicate successfully'
		}

		// console.log(formData)
	},

	delete: async ({ cookies, request, platform }) => {
		console.log('delete product action --->')
		const formData = await request.formData()

		const { data, error } = await trycatch(
			deleteProduct(String(formData.get('id')), platform?.env.TELL_API_KEY!)
		)

		if (error) {
			fail(500, { error: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Product deleted successfully'
		}

		// console.log(formData)
	}
} satisfies Actions
