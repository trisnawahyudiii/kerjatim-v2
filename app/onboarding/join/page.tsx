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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [workspaceCode, setWorkspaceCode] = useState<string | null>(null);

  const initialValue: JoinWorkspace = {
    workspaceCode: "",
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
      onSuccess: (res: any) => {
        console.log("response", res);
        toast({
          title: "Success",
          description: "Berhasil bergabung dengan workspace",
        });
        router.push("/dashboard/" + res.workspaceId);
      },
      onError: (err) => {
        console.log("error", err);
        toast({
          title: "Error",
          description: "Gagal dengan workspace",
        });
        router.push("/dashboard");
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
          isFething={isFetching}
          isError={isError}
          error={error}
          handleJoinWorkspace={handleJoinWorkspace}
        />
      )}
    </>
  );
}
