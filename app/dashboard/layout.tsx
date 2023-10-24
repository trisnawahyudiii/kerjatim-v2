"use client";

import { DashboardNavbar } from "@/layouts";
import { useState } from "react";
import { Sidebar } from "@/features/workspace/components";
import { Workspaces } from "@/features/workspace/core";
import { useGetAllWorkspace } from "@/features/workspace/hooks";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspaces | null>(
    null,
  );

  const { data, isFetching, refetch } = useGetAllWorkspace();

  return (
    <div className="min-h-screen">
      <DashboardNavbar />
      <div className="flex">
        <Sidebar data={data} isFetching={isFetching} refetch={refetch} />
        {children}
      </div>
    </div>
  );
}
