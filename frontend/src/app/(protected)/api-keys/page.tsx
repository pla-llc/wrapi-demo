import CreateKeyDialog from "@/components/create-key";
import KeyDetailsDialog from "@/components/key-details";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAuthState } from "@/hooks/use-auth-state";
import { wrapi } from "@/lib/wrapi";

export default async function ApiKeysPage() {
	const { user } = await useAuthState();
	const { success, keys } = await wrapi.getKeys(user!.id);

	if (!success) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<span className="text-xl">Failed to fetch keys</span>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-3xl font-bold">API Keys</h1>
					<p className="text-muted-foreground">
						Manage your API keys and monitor usage
					</p>
				</div>
				<CreateKeyDialog uid={user!.id}>
					<Button>Create API Key</Button>
				</CreateKeyDialog>
			</div>

			{keys && keys.length > 0 ? (
				<div className="border rounded-lg">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Key</TableHead>
								<TableHead>Usage</TableHead>
								<TableHead>Created</TableHead>
								<TableHead className="text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{keys.map((key: any, index: number) => (
								<TableRow key={key.id || index}>
									<TableCell>
										{key.name || `API Key ${index + 1}`}
									</TableCell>
									<TableCell className="font-mono text-sm">
										{key.key || "N/A"}
									</TableCell>
									<TableCell>
										{key.usage || key.requestCount || "0"}{" "}
										requests
									</TableCell>
									<TableCell>
										{key.createdAt
											? new Date(
													key.createdAt
												).toLocaleDateString()
											: "N/A"}
									</TableCell>
									<TableCell className="text-right">
										<KeyDetailsDialog keyData={key}>
											<Button variant="outline" size="sm">
												View Details
											</Button>
										</KeyDetailsDialog>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div className="text-center py-12">
					<h3 className="text-lg font-medium text-gray-900">
						No API keys yet
					</h3>
					<p className="text-gray-500 mt-1">
						Get started by creating your first API key.
					</p>
					<div className="mt-6">
						<CreateKeyDialog uid={user!.id}>
							<Button>Create your first API Key</Button>
						</CreateKeyDialog>
					</div>
				</div>
			)}
		</div>
	);
}
