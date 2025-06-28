import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/use-auth-state";
import { wrapi } from "@/lib/wrapi";
import Link from "next/link";

export default async function BillingPage() {
	const { user } = await useAuthState();
	const { success, balance } = await wrapi.getAccountBalance(user!.id);

	if (!success) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<span className="text-xl">Unable to fetch account balance</span>
			</div>
		);
	}

	return (
		<div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
			<span className="text-lg">Account Balance</span>
			<span className="text-2xl">{balance} credits</span>
			<Link href={wrapi.getPurchaseLink(user!.id)} target="_blank">
				<Button>Purchase Credits</Button>
			</Link>
		</div>
	);
}
