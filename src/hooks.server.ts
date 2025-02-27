import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('__svelte_session__')

	if (authToken) {
		event.locals.authToken = authToken
	} else {
		event.locals.authToken = null
	}

	// if (event.url.pathname !== '/' && !authToken) {
	// 	redirect(303, '/')
	// } else if (event.url.pathname === '/' && authToken) {
	// 	redirect(303, '/quotations')
	// } else {
	// 	event.locals.authToken = authToken
	// }

	const response = await resolve(event)
	return response
}
