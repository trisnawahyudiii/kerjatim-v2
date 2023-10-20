"use client";

import { UserProfileNav } from "@/components";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const DashboardNavbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between h-[60px] bg-pr-blue-1 items-center">
      <Link href="/" className="h-full">
        <div className="flex items-center justify-center bg-white px-[60px] rounded-br-[60px] rounded-tl-[60px] h-full">
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
