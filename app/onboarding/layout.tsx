"use client";

import { DashboardNavbar } from "@/layouts";
import { useGetAllWorkspace } from "@/features/workspace/hooks";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const { data, isFetching, refetch } = useGetAllWorkspace();

  return (
    <div className="min-h-screen ">
      <DashboardNavbar />
      <div className="flex h-with-navbar w-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
}
