import { type RequestHandler, json } from '@sveltejs/kit'
import { searchCustomerByDniOrRuc } from '$lib/server/data'

export const GET: RequestHandler = async ({ params, platform, request }) => {
	const dniRuc = params.dniRuc

	if (!dniRuc) {
		return json({
			error: 'No se ingresó el DNI/RUC',
			success: false
		})
	}

	// await new Promise((resolve) => setTimeout(resolve, 2000))
	// throw new Error('que fuee mano')
	const customer = await searchCustomerByDniOrRuc(dniRuc, platform?.env.TELL_API_KEY!)
	return json({ success: true, customer })
}
