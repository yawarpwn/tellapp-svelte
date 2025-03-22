type Succes<T> = {
	data: T
	error: null
}
type Failure<E> = {
	error: E
	data: null
}

type Result<T, E = Error> = Succes<T> | Failure<E>

export async function trycatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
	try {
		const data = await promise
		return {
			data,
			error: null
		}
	} catch (error) {
		return {
			data: null,
			error: error as E
		}
	}
}

export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, {
		...options,
		headers: {
			'X-API-KEY': 'supersecretkey',
			...options?.headers
		}
	})
	console.info(
		`OK:${response.ok} - statusCode:${response.status} - ${response.url} - ${response.statusText}`
	)
	if (!response.ok) {
		throw new Error(`Error en la peticion: ${url} - ${response.statusText}`)
	}
	await new Promise((r) => setTimeout(r, 1500))
	return response.json() as T
}

export async function fakePromise(time = 1000) {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}
