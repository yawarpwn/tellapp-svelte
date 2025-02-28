import { redirect, type Actions } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ request, cookies, locals }) => {
	if (!locals.authToken) redirect(307, '/')
}
