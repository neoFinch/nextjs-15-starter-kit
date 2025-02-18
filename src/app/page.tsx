import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
import Image from "next/image";

export default async function Home() {

  console.log('next auth secret - ', process.env.NEXTAUTH_SECRET)
  const session = await getServerSession(authOptions);
  console.log({session});
  return (
    <div>
      <header className="flex p-4 justify-between">
        <h1>Starter Kit</h1>

        <p>
          {!session ? (
            <a className="bg-yellow-300 p-2 rounded-md" href="/api/auth/signin">Sign in</a>
          ) : (
            <a className="bg-red-400 p-2 rounded-md text-white" href="/api/auth/signout">Sign out</a>
          )}
        </p>
      </header>
    </div>
  );
}
