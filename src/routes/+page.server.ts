//TODO: Implementar session en base de datos, que devuelva un sessionId

import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { login } from '$lib/server/data'
import { trycatch } from '$lib/utils'

export const load: PageServerLoad = async ({ locals }) => {
	console.log('authToken', locals.authToken)
	if (locals.authToken) redirect(303, '/quotations')
}

export const actions = {
	login: async ({ request, cookies, url }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		if (!email || !password) {
			return fail(400, { email, missing: true })
		}

		const { data, error } = await trycatch(
			login({
				email,
				password
			})
		)

		if (error) {
			return fail(401, {
				email,
				error: 'Email o contraseña incorrectos'
			})
		}

		const week = 60 * 60 * 24 * 7

		cookies.set('__svelte_session__', data.token, {
			path: '/',
			maxAge: week,
			secure: false,
			sameSite: 'lax'
		})
		redirect(303, '/quotations')
	},
	logout: async ({ cookies }) => {
		cookies.delete('__svelte_session__', { path: '/' })
	}
} satisfies Actions
