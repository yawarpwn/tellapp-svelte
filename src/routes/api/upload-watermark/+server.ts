import { createWatermark } from '$lib/server/data'
import { trycatch } from '$lib/utils'
import { type RequestHandler, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ params, platform, request }) => {
	const formData = await request.formData()
	const { data, error } = await trycatch(createWatermark(formData, platform?.env.TELL_API_KEY!))
	if (error) {
		return json({ success: false, error })
	}

	console.log(data)
	return json({ success: true })
}
