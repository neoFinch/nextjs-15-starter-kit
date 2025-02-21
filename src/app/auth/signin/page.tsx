"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await signIn("credentials", { email, password, redirect: false });

		if (res?.error) {
			setError("Invalid email or password");
		} else {
			window.location.href = "/";
		}
	};


	return (
		<div>
			<div className="p-2">
				<Link href={'/'} className="bg-white px-2 py-1 rounded-sm font-semibold">
					Go Back
				</Link>
			</div>
			<div className="flex items-center justify-center min-h-screen bg-slate-600 flex-wrap">
				<div>
					<form
						onSubmit={handleSubmit}
						className="bg-slate-700 p-6 rounded-lg shadow-md w-96">
						<h2 className="text-2xl font-bold mb-4 text-white" >Sign In</h2>
						{error && <p className="text-red-500">{error}</p>}

						<input
							type="email"
							placeholder="Email"
							className="w-full p-2 border rounded mb-2 bg-slate-600 text-white"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							className="w-full p-2 border rounded mb-2 bg-slate-600 text-white"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button className="w-full bg-black text-white p-2 rounded">
							Login
						</button>
					</form>

					<div className="mt-4 bg-slate-700 w-96 p-6 rounded-md shadow-md">
						<button
							className="w-full bg-gray-200 p-2 rounded"
							onClick={() => signIn("github", { redirect: true, callbackUrl: '/' })}>
							Sign in with GitHub
						</button>
						<button
							className="w-full bg-black text-white p-2 rounded mt-2"
							onClick={() => signIn("google", { redirect: true, callbackUrl: '/' })}>
							Sign in with Google
						</button>
					</div>

				</div>
			</div>
		</div>
	);
}
