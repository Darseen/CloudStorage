import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle hover:bg-primary hover:text-black"
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/" className="hover:bg-primary hover:text-black">
                Homepage
              </Link>
            </li>
            <li>
              <Link href="/files" className="hover:bg-primary hover:text-black">
                Files
              </Link>
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
        <UserMenu />
      </div>
    </div>
  );
}
