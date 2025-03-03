import { type RequestHandler, json } from '@sveltejs/kit'
import { searchCustomerByDniOrRuc } from '$lib/data'

export const GET: RequestHandler = async ({ params, platform, request }) => {
	const customer = await searchCustomerByDniOrRuc(params.dniRuc, platform?.env.TELL_API_KEY)
	return json({
		customer
	})
}
