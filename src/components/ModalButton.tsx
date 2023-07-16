"use client";

import { User } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ModalButtonProps {
  user: User;
}

import { useRef } from "react";

export default function ModalButton({ user }: ModalButtonProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <>
      <button
        className="bg-primary rounded-xl text-white font-bold px-4 py-3 sm:mt-10 mt-8 hover:bg-black transition"
        onClick={user ? () => router.push("/files") : showModal}
      >
        Files Dashboard
      </button>
      {/* Unauthorized modal */}
      <dialog ref={modalRef} className="modal ">
        <form method="dialog" className="modal-box outline outline-secondary">
          <h3 className="font-bold text-lg">Unauthorized!</h3>
          <p className="py-4">You need to be signed in</p>
          <div className="modal-action flex flex-row justify-center">
            <Link href="/signin" className="btn  btn-secondary">
              Sign in
            </Link>
            <Link href="/signup" className="btn  btn-secondary">
              Sign up
            </Link>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
