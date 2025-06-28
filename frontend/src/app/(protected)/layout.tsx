import { useAuthState } from "@/hooks/use-auth-state";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const { signedIn } = await useAuthState();

	if (!signedIn) {
		redirect("/");
	}

	return children;
}
