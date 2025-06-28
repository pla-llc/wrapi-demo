import SignInButton from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/use-auth-state";
import Link from "next/link";

export default async function Home() {
	const { user, signedIn } = await useAuthState();

	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
			<span className="text-center text-xl">
				{signedIn ? `Hello ${user.name}` : "You are not signed in"}
			</span>
			{signedIn ? (
				<div className="flex items-center gap-2">
					<Link href="/api-keys">
						<Button>API Keys</Button>
					</Link>
				</div>
			) : (
				<SignInButton />
			)}
		</div>
	);
}
