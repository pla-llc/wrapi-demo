import { UsageProvider } from "@/contexts/usage-context";
import { useAuthState } from "@/hooks/use-auth-state";
import { wrapi } from "@/lib/wrapi";
import UsagePageClient from "./usage-page-client";

export default async function UsagePage() {
	const { user } = await useAuthState();
	const { success, keys } = await wrapi.getKeys(user!.id);

	if (!success) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<span className="text-xl">Unable to fetch API keys</span>
			</div>
		);
	}

	return (
		<UsageProvider>
			<UsagePageClient keys={keys} />
		</UsageProvider>
	);
}
