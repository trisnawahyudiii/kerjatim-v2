"use client";

import { UserProfileNav } from "components/user-profile-nav";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const DashboardNavbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex h-[60px] items-center justify-between bg-foreground">
      <Link href="/" className="h-full">
        <div className="flex h-full items-center justify-center rounded-br-[60px] rounded-tl-[60px] bg-white px-[60px]">
          <Image
            src="/logo-kerjatim.png"
            alt="logo kerjatim"
            width={106}
            height={50}
          />
        </div>
      </Link>

      <div className="mr-12">
        {session?.user ? (
          <UserProfileNav />
        ) : (
          <Link
            href="/authenticate"
            className="duration:300 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-slate-200 transition  ease-in-out hover:bg-transparent hover:text-blue-400 hover:ring-1 hover:ring-blue-400"
          >
            SignIn
          </Link>
        )}
      </div>
    </nav>
  );
};
