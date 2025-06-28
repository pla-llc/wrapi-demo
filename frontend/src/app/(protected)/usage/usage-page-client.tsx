"use client";

import KeySelector from "@/components/key-selector";
import MonthSelector from "@/components/month-selector";
import UsageDisplay from "@/components/usage-display";

interface UsagePageClientProps {
	keys: Array<{
		name: string;
		key: string;
	}>;
}

export default function UsagePageClient({ keys }: UsagePageClientProps) {
	return (
		<div className="container mx-auto py-8 space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Usage Analytics</h1>
				<p className="text-muted-foreground">
					Monitor your API key usage and request statistics
				</p>
			</div>

			<div className="flex gap-4 items-end">
				<KeySelector keys={keys} />
				<MonthSelector />
			</div>

			<UsageDisplay />
		</div>
	);
}
