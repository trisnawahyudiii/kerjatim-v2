import { useMutation } from "@tanstack/react-query";
import { WorkspaceService } from "../services";
import { JoinWorkspace } from "../components";

export type JoinRespose = {
  id: string;
  isAdmn: boolean;
  userId: string;
  workspaceId: string;
};

export const useJoinWorkspace = () => {
  const workspaceService = new WorkspaceService();

  return useMutation({
    mutationFn: (params: JoinWorkspace) => workspaceService.join(params),
  });
};
