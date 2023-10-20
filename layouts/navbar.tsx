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
        <div className="flex gap-5 items-center">
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
              className="px-4 py-2 bg-blue-600 font-semibold rounded-xl text-slate-200 hover:text-blue-400 hover:bg-transparent hover:ring hover:ring-1 hover:ring-blue-400 transition ease-in-out duration:300"
            >
              SignIn
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
};
