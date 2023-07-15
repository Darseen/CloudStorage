"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserMenu() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image src="" alt="" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href="/profile" className="hover:bg-primary hover:text-black">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/settings" className="hover:bg-primary hover:text-black">
            Settings
          </Link>
        </li>
        <li>
          <button
            className="hover:bg-primary hover:text-black"
            onClick={(e) => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
