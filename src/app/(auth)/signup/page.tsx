"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);

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
      await signIn("credentials", {
        ...credentials,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    setIsLoadingGoogle(true);

    try {
      await signIn("google");
    } catch (err) {
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      <div className="h-96 w-96 bg-base-100 outline outline-secondary rounded-lg flex flex-col justify-center items-center">
        <form
          className="form-control w-full max-w-xs mt-6"
          onSubmit={handleSignIn}
        >
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

          <div className="my-5">
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
            className="btn btn-secondary mt-3 text-lg hover:bg-opacity-85"
            disabled={isLoading}
          >
            Sign In{" "}
            {isLoading && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </button>
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
