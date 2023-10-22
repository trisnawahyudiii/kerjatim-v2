"use client";

import { Container } from "@/components/ui";
import { navigationConfig } from "config/navigations";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserProfileNav } from "@/components";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <Container className="flex items-center justify-between">
        {/* logo */}
        <Link href="/">
          <Image
            src="/logo-kerjatim.png"
            width={106}
            height={50}
            alt="Logo Kerjatim"
          />
        </Link>

        {/* navlinks */}
        <div className="flex items-center gap-5">
          {navigationConfig.map((navigation) => {
            return (
              <Link
                href={navigation.href}
                key={navigation.id}
                className="font-semibold text-slate-500 hover:text-slate-900"
              >
                {navigation.name}
              </Link>
            );
          })}

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
      </Container>
    </nav>
  );
};
