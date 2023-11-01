"use client";

import { DashboardNavbar } from "@/layouts";
import { Sidebar } from "@/features/workspace/components";
import { useGetAllWorkspace } from "@/features/workspace/hooks";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data, isFetching, refetch } = useGetAllWorkspace();

  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      <div className="flex w-screen">
        <Sidebar data={data} isFetching={isFetching} refetch={refetch} />
        {children}
      </div>
    </div>
  );
}
