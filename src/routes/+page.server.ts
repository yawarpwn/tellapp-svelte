//TODO: Implementar session en base de datos, que devuelva un sessionId

import { login } from '$lib/data'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.authToken) redirect(303, '/quotations')
}

export const actions = {
	login: async ({ request, cookies, url }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		if (!email) {
			return fail(400, { email, missing: true })
		}

		if (!password) {
			return fail(400, { email, incorrect: true })
		}

		try {
			const authToken = await login({
				email,
				password
			})

			cookies.set('__svelte_session__', authToken, {
				path: '/',
				maxAge: 60 * 60 * 24,
				secure: false,
				sameSite: 'lax'
			})

			return {
				success: true
			}
		} catch (error) {
			return fail(400, { email, incorrect: true })
		}
	},
	logout: async ({ cookies }) => {
		cookies.delete('__svelte_session__', { path: '/' })
	}
} satisfies Actions
