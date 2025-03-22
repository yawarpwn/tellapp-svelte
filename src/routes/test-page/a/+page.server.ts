import type Actions from './$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, platform, request }) => {
	console.log(request.url)
	const url = new URL(request.url)
	const q = url.searchParams.get('q')
	console.log({ q })
	await new Promise((r) => {
		setTimeout(r, 1500)
	})
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const q = formData.get('q')
		console.log({ q })

		return {
			q
		}
	}
}
