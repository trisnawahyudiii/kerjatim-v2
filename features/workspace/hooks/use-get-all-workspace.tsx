import { ErrorResponse, SuccessResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { WorkspaceService } from "../services/workspace-service";
import { Workspaces } from "../core";
import { WORKSPACE_QUERY_KEY } from "../utilities";

export const useGetAllWorkspace = () => {
  const workspaceService = new WorkspaceService();

  return useQuery<Workspaces[], ErrorResponse>({
    queryFn: () => workspaceService.getAll(),
    queryKey: WORKSPACE_QUERY_KEY,
  });
};
