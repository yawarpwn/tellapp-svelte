// src/routes/api/logout/+server.js
//
import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = ({ cookies }) => {
	console.log('logout')
	// Eliminar la cookie de sesión
	cookies.delete('__svelte_session__', { path: '/' })

	// Retornar una respuesta exitosa
	return new Response(null, { status: 200 })
}
