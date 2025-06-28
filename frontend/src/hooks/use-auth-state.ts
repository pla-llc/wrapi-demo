import { User } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type AuthState = {} & (
	| {
			user: User;
			signedIn: true;
	  }
	| {
			user: null;
			signedIn: false;
	  }
);

export async function useAuthState() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	let user = session?.user ?? null;
	const signedIn = !!session?.user;

	return {
		user,
		signedIn,
	} as AuthState;
}
