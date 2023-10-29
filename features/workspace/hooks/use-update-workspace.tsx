import { useMutation } from "@tanstack/react-query";
import { WorkspaceService } from "../services";
import { Workspaces } from "../core";

export const useUpdateWorkspace = () => {
  const workspaceService = new WorkspaceService();

  return useMutation({
    mutationFn: (params: { id: string; data: Workspaces }) =>
      workspaceService.update(params.data, params.id),
  });
};
