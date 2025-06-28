"use client";

import { getUsageData } from "@/actions";
import { useUsage } from "@/contexts/usage-context";
import { useEffect, useState } from "react";

interface UsageData {
	month: number;
	year: number;
	requests: number;
	credits: number;
	statusCodes: number[];
	methods: string[];
	paths: string[];
}

export default function UsageDisplay() {
	const { selectedKey, selectedMonth } = useUsage();
	const [usageData, setUsageData] = useState<UsageData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUsageData() {
			if (!selectedKey || !selectedMonth) {
				setUsageData(null);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const result = await getUsageData(selectedKey, selectedMonth);

				if (result.success) {
					setUsageData(result.usage);
				} else {
					setError("Failed to fetch usage data");
				}
			} catch (err) {
				setError("An error occurred while fetching usage data");
			} finally {
				setLoading(false);
			}
		}

		fetchUsageData();
	}, [selectedKey, selectedMonth]);

	if (!selectedKey || !selectedMonth) {
		return (
			<div className="p-6 border rounded-lg bg-gray-50">
				<p className="text-gray-500">
					Please select both an API key and a month to view usage
					data.
				</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="p-6 border rounded-lg">
				<p className="text-gray-500">Loading usage data...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 border rounded-lg bg-red-50">
				<p className="text-red-600">Error: {error}</p>
			</div>
		);
	}

	if (!usageData) {
		return (
			<div className="p-6 border rounded-lg bg-gray-50">
				<p className="text-gray-500">No usage data available.</p>
			</div>
		);
	}

	return (
		<div className="p-6 border rounded-lg bg-white">
			<h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="text-center">
					<div className="text-3xl font-bold text-blue-600">
						{usageData.requests.toLocaleString()}
					</div>
					<div className="text-sm text-gray-500">Total Requests</div>
				</div>
				<div className="text-center">
					<div className="text-lg font-medium text-gray-700">
						{selectedMonth}
					</div>
					<div className="text-sm text-gray-500">Month</div>
				</div>
			</div>
		</div>
	);
}
