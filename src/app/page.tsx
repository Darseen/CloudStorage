import { User, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ModalButton from "@/components/ModalButton";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          <span className="whitespace-nowrap text-primary">CloudStorage</span>{" "}
          App For Free Online File Storing.
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          This app was built using Next.js, Mongodb, Prisma and TailwindCSS
        </h2>

        <ModalButton user={session?.user as unknown as User} />

        <a
          href="https://github.com/darseen/CloudStorage"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-5 mt-14 transition duration-300 ease-in-out"
        >
          The source code of this project is available on{" "}
          <span className="text-blue-600 hover:underline">Github</span>
        </a>
      </main>
    </div>
  );
}
