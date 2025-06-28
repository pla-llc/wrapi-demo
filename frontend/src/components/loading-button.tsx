"use client";

import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface LoadingButtonProps {
	children: ReactNode;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
}

export default function LoadingButton({
	children,
	variant = "default",
	size = "default",
	className,
}: LoadingButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			variant={variant}
			size={size}
			className={className}
		>
			{pending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
			{children}
		</Button>
	);
}
