"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface UsageContextType {
	selectedKey: string | null;
	selectedMonth: number;
	setSelectedKey: (key: string | null) => void;
	setSelectedMonth: (month: number) => void;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: ReactNode }) {
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth() + 1
	);

	return (
		<UsageContext.Provider
			value={{
				selectedKey,
				selectedMonth,
				setSelectedKey,
				setSelectedMonth,
			}}
		>
			{children}
		</UsageContext.Provider>
	);
}

export function useUsage() {
	const context = useContext(UsageContext);
	if (context === undefined) {
		throw new Error("useUsage must be used within a UsageProvider");
	}
	return context;
}
