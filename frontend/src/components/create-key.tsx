"use client";

import { createApiKey } from "@/actions";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import LoadingButton from "./loading-button";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CreateKeyDialog({
	uid,
	children,
}: {
	uid: string;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create API Key</DialogTitle>
					<DialogDescription>
						Create a new API key for your account.
					</DialogDescription>
				</DialogHeader>

				<form
					action={async (data: FormData) => {
						const name = data.get("name") as string;
						if (!name) {
							toast.error("Name is required");
							return;
						}

						const { success } = await createApiKey(name, uid);

						if (!success) {
							toast.error("Failed to create API Key");
							return;
						}

						toast.success("API Key created successfully");
						setOpen(false);
						router.refresh();
					}}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-2">
						<Label>Name</Label>
						<Input name="name" placeholder="My API Key" />
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="ghost">Cancel</Button>
						</DialogClose>
						<LoadingButton>Create</LoadingButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
