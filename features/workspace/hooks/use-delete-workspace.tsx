import { useMutation } from "@tanstack/react-query";
import { WorkspaceService } from "../services";
import { Workspaces } from "../core";

export const useDeleteWorkspace = () => {
  const workspaceService = new WorkspaceService();

  return useMutation({
    mutationFn: (id: string) => workspaceService.delete(id),
  });
};
