import { serve } from "@hono/node-server";
import Wrapi from "@wrapi.dev/sdk";
import dotenv from "dotenv";
import { Hono } from "hono";

dotenv.config();

const app = new Hono();
const wrapi = new Wrapi({
	apiId: process.env.WRAPI_API_ID!,
	apiKey: process.env.WRAPI_API_KEY!,
});

const ROUTE_COSTS: Record<string, number> = {
	"/": 1, // costs 1 credit
	"/test": 10, // costs 10 credits
};

app.use("*", async (c, next) => {
	const headers = c.req.raw.headers;
	const apiKey = headers.get("x-api-key"); // or any auth header name you want to use
	if (!apiKey) {
		return c.json(
			{
				error: "API key is required.",
			},
			401
		);
	}

	// Get path and cost of request
	const url = new URL(c.req.raw.url);
	const path = "/" + url.pathname.split("/").slice(1).join("/");
	const cost = ROUTE_COSTS[path];

	// Log request in Wrapi
	const { success, error } = await wrapi.request(
		c.req.method,
		path,
		200,
		apiKey,
		cost
	);
	if (!success) {
		return c.json(
			{
				error,
			},
			500
		);
	}

	// Continue to API
	await next();
});

// Costs 1 credit
app.get("/", (c) => {
	return c.text("Hello Hono!");
});

// Costs 10 credits
app.get("/test", (c) => {
	return c.text("Hello Test!");
});

serve(
	{
		fetch: app.fetch,
		port: 8080,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
