"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Authenticate() {
  const { data: session } = useSession();

  console.log(session);

  if (session && session.user) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-3">
        <p className="font-bold">Hello, {session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          SignOut
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-3">
      <p>Login Page</p>
      <button
        onClick={() => signIn("google")}
        className="text-green-600 px-4 py-2 bg-white border border-green-600 shadow-sm rounded-sm"
      >
        SignIn
      </button>
    </div>
  );
}
