"use server";

import { wrapi } from "./lib/wrapi";

export async function createApiKey(name: string, uid: string) {
	return await wrapi.createApiKey(name, uid);
}

export async function deleteApiKey(apiKey: string) {
	return await wrapi.deleteApiKey(apiKey);
}
