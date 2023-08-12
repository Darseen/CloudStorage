"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

interface UserMenuProps {
  user: User | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {user?.image ? (
            <Image
              src={user?.image}
              alt="User image"
              width={200}
              height={200}
            />
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <circle
                  cx="12"
                  cy="9"
                  r="3"
                  stroke="#1eb854"
                  strokeWidth="1.5"
                ></circle>{" "}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#1eb854"
                  strokeWidth="1.5"
                ></circle>{" "}
                <path
                  d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                  stroke="#1eb854"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
          )}
        </div>
      </label>
      {user ? (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-auto font-semibold"
        >
          <li>
            <Link href="/profile" className="hover:bg-primary hover:text-black">
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="hover:bg-primary hover:text-black"
            >
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
      ) : (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-auto font-semibold"
        >
          <li>
            <Link href="/signin" className="hover:bg-primary hover:text-black">
              Sign in
            </Link>
          </li>
          <li>
            <Link href="/signup" className="hover:bg-primary hover:text-black">
              Sign up
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
