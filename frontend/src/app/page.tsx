import SignInButton from "@/components/sign-in";
import { useAuthState } from "@/hooks/use-auth-state";

export default async function Home() {
	const { user, signedIn } = await useAuthState();

	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
			<span className="text-center text-xl">
				{signedIn ? `Hello ${user.name}` : "You are not signed in"}
			</span>
			{signedIn ? <></> : <SignInButton />}
		</div>
	);
}
