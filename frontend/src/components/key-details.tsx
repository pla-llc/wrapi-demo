"use client";

import { deleteApiKey } from "@/actions";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface KeyData {
	id?: string;
	name?: string;
	key?: string;
	status?: string;
	usage?: number;
	requestCount?: number;
	createdAt?: string;
	updatedAt?: string;
	lastUsed?: string;
}

interface KeyDetailsDialogProps {
	keyData: KeyData;
	children: React.ReactNode;
}

export default function KeyDetailsDialog({
	keyData,
	children,
}: KeyDetailsDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [keyVisible, setKeyVisible] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const router = useRouter();

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.error("Failed to copy to clipboard:", err);
		}
	};

	const handleDeleteSubmit = async (formData: FormData) => {
		if (!keyData.key) return;

		try {
			const result = await deleteApiKey(keyData.key);
			if (result.success) {
				setShowDeleteDialog(false);
				setIsOpen(false);
				router.refresh();
			} else {
				console.error("Failed to delete API key");
			}
		} catch (error) {
			console.error("Error deleting API key:", error);
		}
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>API Key Details</DialogTitle>
						<DialogDescription>
							Complete information about your API key
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-6">
						{/* Key Name */}
						<div className="space-y-2">
							<Label className="text-sm font-medium">
								Key Name
							</Label>
							<div className="p-3 bg-gray-50 rounded-md text-sm">
								{keyData.name || "Unnamed Key"}
							</div>
						</div>

						{/* API Key */}
						<div className="space-y-2">
							<Label className="text-sm font-medium">
								API Key
							</Label>
							<div className="flex items-center space-x-2">
								<div className="flex-1 p-3 bg-gray-50 rounded-md font-mono text-sm break-all">
									{keyVisible
										? keyData.key || "N/A"
										: "••••••••••••••••••••••••••••••••"}
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setKeyVisible(!keyVisible)}
								>
									{keyVisible ? "Hide" : "Show"}
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										keyData.key &&
										copyToClipboard(keyData.key)
									}
									disabled={!keyData.key}
								>
									Copy
								</Button>
							</div>
						</div>

						{/* Status */}
						{keyData.status && (
							<div className="space-y-2">
								<Label className="text-sm font-medium">
									Status
								</Label>
								<div className="p-3 bg-gray-50 rounded-md">
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											keyData.status === "active"
												? "bg-green-100 text-green-800"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{keyData.status}
									</span>
								</div>
							</div>
						)}

						{/* Usage Statistics */}
						<div className="space-y-2">
							<Label className="text-sm font-medium">
								Usage Statistics
							</Label>
							<div className="p-3 bg-gray-50 rounded-md text-sm">
								<div className="flex justify-between items-center">
									<span>Total Requests:</span>
									<span className="font-medium">
										{keyData.usage ||
											keyData.requestCount ||
											0}
									</span>
								</div>
							</div>
						</div>

						{/* Timestamps */}
						<div className="grid grid-cols-1 gap-4">
							{keyData.createdAt && (
								<div className="space-y-2">
									<Label className="text-sm font-medium">
										Created
									</Label>
									<div className="p-3 bg-gray-50 rounded-md text-sm">
										{new Date(
											keyData.createdAt
										).toLocaleString()}
									</div>
								</div>
							)}

							{keyData.updatedAt && (
								<div className="space-y-2">
									<Label className="text-sm font-medium">
										Last Updated
									</Label>
									<div className="p-3 bg-gray-50 rounded-md text-sm">
										{new Date(
											keyData.updatedAt
										).toLocaleString()}
									</div>
								</div>
							)}

							{keyData.lastUsed && (
								<div className="space-y-2">
									<Label className="text-sm font-medium">
										Last Used
									</Label>
									<div className="p-3 bg-gray-50 rounded-md text-sm">
										{new Date(
											keyData.lastUsed
										).toLocaleString()}
									</div>
								</div>
							)}
						</div>

						{/* Key ID */}
						{keyData.id && (
							<div className="space-y-2">
								<Label className="text-sm font-medium">
									Key ID
								</Label>
								<div className="p-3 bg-gray-50 rounded-md font-mono text-sm">
									{keyData.id}
								</div>
							</div>
						)}

						{/* Delete Section */}
						<div className="border-t pt-6">
							<div className="space-y-4">
								<div>
									<Label className="text-sm font-medium text-red-600">
										Danger Zone
									</Label>
									<p className="text-sm text-gray-500 mt-1">
										Once you delete this API key, it cannot
										be recovered.
									</p>
								</div>
								<Button
									variant="destructive"
									onClick={() => setShowDeleteDialog(true)}
									disabled={!keyData.key}
								>
									Delete API Key
								</Button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<DialogContent className="sm:max-w-[400px]">
					<DialogHeader>
						<DialogTitle>Delete API Key</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this API key? This
							action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="p-4 bg-red-50 rounded-md">
							<p className="text-sm text-red-800 font-medium">
								Key: {keyData.name || "Unnamed Key"}
							</p>
							<p className="text-xs text-red-600 font-mono mt-1">
								{keyData.key
									? `${keyData.key.slice(0, 8)}...${keyData.key.slice(-4)}`
									: "N/A"}
							</p>
						</div>
						<form
							action={handleDeleteSubmit}
							className="flex space-x-2"
						>
							<LoadingButton
								variant="destructive"
								className="flex-1"
							>
								Yes, Delete
							</LoadingButton>
							<Button
								type="button"
								variant="outline"
								onClick={() => setShowDeleteDialog(false)}
								className="flex-1"
							>
								Cancel
							</Button>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
