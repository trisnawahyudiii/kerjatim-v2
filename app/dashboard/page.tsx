"use client";
import { useState } from "react";
import { Sidebar } from "@/features/workspace/components";
import { Workspaces } from "@/features/workspace/core";

export default function DashboardPage() {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspaces | null>(
    null,
  );
  return (
    <>
      <Sidebar />
    </>
  );
}
