import Link from "next/link";

export default function Header() {
	return (
		<header className="flex items-center w-screen px-20 h-16 bg-transparent">
			<div className="w-full flex items-center">
				<Link href="/">
					<span className="text-xl font-bold">Wrapi Demo</span>
				</Link>
			</div>
		</header>
	);
}
