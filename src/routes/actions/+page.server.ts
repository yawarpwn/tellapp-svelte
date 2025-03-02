import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { searchCustomerByDniOrRuc } from '$lib/data'

export const actions: Actions = {
	logout: ({ cookies, request }) => {
		cookies.delete('__svelte_session__', { path: '/' })
	},

	search: async ({ request, platform }) => {
		const formData = await request.formData()
		const ruc = formData.get('ruc') as string

		if (ruc.length !== 11) {
			return {
				success: false,
				message: 'El RUC debe tener 11 dígitos'
			}
		}

		const customer = await searchCustomerByDniOrRuc(ruc, platform?.env.TELL_API_KEY)
		return customer
		// TODO register the user
	}
}
