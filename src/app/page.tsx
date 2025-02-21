import { authOptions } from "@/auth";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Header session={session} />
      <div className="text-slate-300">
        <h1 className="text-4xl font-bold text-center mt-8 ">
          Welcome to your Next.js Starter Kit
        </h1>
        <p className="text-center mt-4 text-slate-300">
          Get started by editing <code>app/page.tsx</code>
        </p>
      </div>
    </div>
  );
}
