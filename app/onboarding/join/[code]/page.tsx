"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  ConfirmJoinWorkspace,
  JoinWorkspace,
  JoinWorkspaceModal,
} from "@/features/workspace/components";
import {
  useGetWorkspaceByCode,
  useJoinWorkspace,
} from "@/features/workspace/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const { code } = useParams();
  const { toast } = useToast();
  const [workspaceCode, setWorkspaceCode] = useState<string | null>(
    String(code),
  );

  const initialValue: JoinWorkspace = {
    workspaceCode: code ?? "",
  };

  const { data, isFetching, isError, error } = useGetWorkspaceByCode(
    workspaceCode!,
    Boolean(workspaceCode!),
  );

  const handleSubmit = (values: JoinWorkspace) => {
    setWorkspaceCode(values.workspaceCode as string);
  };

  const joinWorkspace = useJoinWorkspace();

  const handleJoinWorkspace = (values: JoinWorkspace) => {
    return joinWorkspace.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasi bergabung dengan workspace",
        });
      },
    });
  };

  return (
    <>
      {!workspaceCode ? (
        <JoinWorkspaceModal
          initialValue={initialValue}
          loading={isFetching}
          handleSubmit={handleSubmit}
        />
      ) : (
        <ConfirmJoinWorkspace
          workspace={data}
          isError={isError}
          isFething={isFetching}
          error={error}
          handleJoinWorkspace={handleJoinWorkspace}
        />
      )}
    </>
  );
}
