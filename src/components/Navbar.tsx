import Link from "next/link";
import UserMenu from "./UserMenu";
import { User, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="navbar bg-transparent fixed z-10 backdrop-filter backdrop-blur-sm border-b border-slate-300/10">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle text-primary hover:bg-primary hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-auto font-semibold"
          >
            <li>
              <a href="/" className="hover:bg-primary hover:text-black">
                Homepage
              </a>
            </li>
            <li>
              <Link href="/about" className="hover:bg-primary hover:text-black">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl bg-primary text-black hover:bg-opacity-80 hover:bg-primary"
        >
          CloudStorage
        </Link>
      </div>
      <div className="navbar-end">
        <UserMenu user={session?.user as unknown as User} />
      </div>
    </div>
  );
}
