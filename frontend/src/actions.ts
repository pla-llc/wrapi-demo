"use server";

import { wrapi } from "./lib/wrapi";

export async function createApiKey(name: string, uid: string) {
	return await wrapi.createApiKey(name, uid);
}

export async function deleteApiKey(apiKey: string) {
	return await wrapi.deleteApiKey(apiKey);
}

export async function getUsageData(keyId: string, month: number) {
	return await wrapi.getKeyUsage(keyId, month, new Date().getFullYear());
}
