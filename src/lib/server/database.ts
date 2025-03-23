const db = new Map()

export function createTodo(userId: string, description: string) {
	const todos = db.get(userId)

	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	})
}
