"use client";
import { useGetSingleWorkspace } from "@/features/workspace/hooks";
import { useParams } from "next/navigation";

export default function SettingPage() {
  const { workspaceId } = useParams();
  const { data, isFetching } = useGetSingleWorkspace(
    String(workspaceId),
    Boolean(workspaceId),
  );

  return (
    <>
      <div>Pengaturan Workspace</div>
      <p>{data?.name}</p>
    </>
  );
}
