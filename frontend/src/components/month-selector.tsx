"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUsage } from "@/contexts/usage-context";

const months = [
	{ value: "1", label: "January 2025" },
	{ value: "2", label: "February 2025" },
	{ value: "3", label: "March 2025" },
	{ value: "4", label: "April 2025" },
	{ value: "5", label: "May 2025" },
	{ value: "6", label: "June 2025" },
	{ value: "7", label: "July 2025" },
	{ value: "8", label: "August 2025" },
	{ value: "9", label: "September 2025" },
	{ value: "10", label: "October 2025" },
	{ value: "11", label: "November 2025" },
	{ value: "12", label: "December 2025" },
];

export default function MonthSelector() {
	const { selectedMonth, setSelectedMonth } = useUsage();

	return (
		<div className="flex flex-col gap-2">
			<label className="text-sm font-medium">Select Month</label>
			<Select
				value={selectedMonth.toString()}
				onValueChange={(value) => setSelectedMonth(parseInt(value))}
			>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Choose a month" />
				</SelectTrigger>
				<SelectContent>
					{months.map((month) => (
						<SelectItem key={month.value} value={month.value}>
							{month.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
