export default function Header({ session }: { session: any }) {
	return (
		<header className="flex p-4 justify-between bg-slate-800">
			<h1 className="text-white font-semibold text-lg">Starter</h1>

			<div>
				{!session ? (
					<a
						className="hover:bg-slate-600 py-2 px-2 rounded-sm text-white"
						href="/api/auth/signin">
						Sign In
					</a>
				) : (
					<div className="flex items-center gap-2">
						<div className="text-white text-sm">
							{session.user?.email}
						</div>
						<a
							className="bg-red-400 py-1 px-2 rounded-sm text-white"
							href="/api/auth/signout">
							Sign Out
						</a>
					</div>
				)}
			</div>
		</header>
	)
}