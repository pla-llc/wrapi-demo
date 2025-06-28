"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUsage } from "@/contexts/usage-context";

interface KeySelectorProps {
	keys: Array<{
		name: string;
		key: string;
	}>;
}

export default function KeySelector({ keys }: KeySelectorProps) {
	const { selectedKey, setSelectedKey } = useUsage();

	return (
		<div className="flex flex-col gap-2">
			<label className="text-sm font-medium">Select API Key</label>
			<Select value={selectedKey || ""} onValueChange={setSelectedKey}>
				<SelectTrigger className="w-[300px]">
					<SelectValue placeholder="Choose an API key" />
				</SelectTrigger>
				<SelectContent>
					{keys.map((key) => (
						<SelectItem key={key.key} value={key.key}>
							{key.name || `Key ${key.key.slice(-8)}`}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
