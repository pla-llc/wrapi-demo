import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { wrapi } from "./wrapi";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
	databaseHooks: {
		account: {
			create: {
				after: async (account, context) => {
					const { success } = await wrapi.linkUser(account.userId);
					if (!success) {
						throw new Error("Failed to link user to Wrapi");
					}

					console.log("User linked to Wrapi");
				},
			},
		},
	},
});
