export const csr = false
import type { PageServerLoad, Actions } from './$types'

// export const load: PageServerLoad = (event) => {
// 	return {
// 		user: event.locals.user
// 	}
// }

export const actions = {
	default: async (event) => {
		event.cookies.delete('__svelte_session__', { path: '/' })
		// event.locals.user = null
	}
} satisfies Actions
