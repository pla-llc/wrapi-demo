"use client";

import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const authClient = createAuthClient();
export default function SignInButton() {
	return (
		<Button
			onClick={async () => {
				await authClient.signIn.social({
					provider: "google",
				});
				toast.success("Signed in successfully");
			}}
		>
			Sign In
		</Button>
	);
}
