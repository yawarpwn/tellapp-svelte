import {
	createProduct,
	fetchProducts,
	deleteProduct,
	fetchProductCategories,
	updateProduct
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
		console.log('action')

		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const result = createProductSchema.safeParse(entries)

		if (!result.success) {
			return fail(403, { errors: result.error.flatten().fieldErrors })
		}

		const { data, error } = await trycatch(createProduct(result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			fail(400, { errors: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Product created successfully'
		}

		// console.log(formData)
	},

	update: async ({ cookies, request, platform }) => {
		console.log('action')

		const formData = await request.formData()
		const entries = Object.fromEntries(formData.entries())
		const id = String(formData.get('id'))
		const result = updateProductSchema.safeParse(entries)

		if (!result.success) {
			return fail(403, { errors: result.error.flatten().fieldErrors })
		}

		const { error } = await trycatch(updateProduct(id, result.data, platform?.env.TELL_API_KEY!))

		if (error) {
			fail(400, { errors: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Product created successfully'
		}

		// console.log(formData)
	},

	delete: async ({ cookies, request, platform }) => {
		const formData = await request.formData()

		const { data, error } = await trycatch(
			deleteProduct(String(formData.get('id')), platform?.env.TELL_API_KEY!)
		)

		if (error) {
			fail(500, { errors: 'Interna server error' })
		}

		return {
			success: true,
			message: 'Product deleted successfully'
		}

		// console.log(formData)
	}
} satisfies Actions
