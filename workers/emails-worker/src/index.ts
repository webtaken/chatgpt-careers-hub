import { Client } from 'pg';

interface Env {
	DB_URL: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new Client instance using the connection string
		// or explicit parameters as shown in the previous steps.
		// Here, we are using the connection string method.
		const sql = new Client({
			connectionString: env.DB_URL,
		});
		// Connect to the PostgreSQL database
		await sql.connect();

		// Query the products table
		const result = await sql.query('SELECT * FROM users_user');

		// Return the result as JSON
		return new Response(JSON.stringify(`Found: ${result.rowCount} users`), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
	async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
		// Create a new Client instance using the connection string
		// or explicit parameters as shown in the previous steps.
		// Here, we are using the connection string method.
		const sql = new Client({
			connectionString: env.DB_URL,
		});
		// Connect to the PostgreSQL database
		await sql.connect();

		// Query the products table
		const result = await sql.query('SELECT * FROM users_user');

		console.log(`Found: ${result.rowCount} users`);
	},
} satisfies ExportedHandler<Env>;
