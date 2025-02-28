import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	logout: ({ cookies, request }) => {
		cookies.delete('__svelte_session__', { path: '/' })
	}
}
