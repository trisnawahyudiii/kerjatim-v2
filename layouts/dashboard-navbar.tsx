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

      <UserProfileNav className="me-[60px]" />
    </nav>
  );
};
