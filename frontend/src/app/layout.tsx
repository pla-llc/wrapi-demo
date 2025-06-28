import Header from "@/components/header";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Wrapi Demo",
	description: "An example project that uses the Wrapi API",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} antialiased relative overflow-x-hidden`}
			>
				<Toaster richColors />
				<Header />
				{children}
			</body>
		</html>
	);
}
