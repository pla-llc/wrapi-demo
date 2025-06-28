import Wrapi from "@wrapi.dev/sdk";

export const wrapi = new Wrapi({
	apiId: process.env.WRAPI_API_ID!,
	apiKey: process.env.WRAPI_API_KEY!,
});
