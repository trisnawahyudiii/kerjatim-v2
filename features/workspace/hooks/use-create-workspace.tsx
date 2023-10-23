import { useMutation } from "@tanstack/react-query";
import { WorkspaceService } from "../services";
import { Workspaces } from "../core";

export const useCreateWorkspace = () => {
  const workspaceService = new WorkspaceService();

  return useMutation({
    mutationFn: (data: Workspaces) => workspaceService.create(data),
  });
};
