"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData: FormData = new FormData(e.currentTarget);
    const credentials = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (data && !data.err) {
        router.push("/");
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    setIsLoadingGoogle(true);

    try {
      await signIn("google", { redirect: true, callbackUrl: "/" });
    } catch (err) {
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="grid place-content-center h-screen background-gradient">
      <div className="h-auto sm:w-96 w-[350px] bg-base-100 outline outline-secondary rounded-lg flex flex-col justify-center items-center ">
        <form
          className="form-control w-full max-w-xs p-2"
          onSubmit={handleSignIn}
        >
          <div>
            <label className="label">
              <span className="label-text font-semibold">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="input input-bordered w-full max-w-xs input-secondary"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered w-full max-w-xs input-secondary"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs input-secondary"
              required
            />
          </div>
          <button
            className="btn btn-secondary text-lg hover:bg-opacity-85 mt-6"
            disabled={isLoading}
          >
            Sign Up{" "}
            {isLoading && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </button>
          <span className="text-zinc-200 text-sm mt-2">
            {"Already have an account? "}{" "}
            <Link href="/signin" className="underline text-secondary">
              Sign in
            </Link>
          </span>
        </form>
        <button
          className="btn btn-outline btn-secondary my-3 w-full max-w-xs"
          onClick={googleSignIn}
          disabled={isLoadingGoogle}
        >
          <Image
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
            width={17}
            height={17}
          />
          <span>Continue with Google</span>
          {isLoadingGoogle && (
            <span className="loading loading-spinner loading-sm" />
          )}
        </button>
      </div>
    </div>
  );
}
