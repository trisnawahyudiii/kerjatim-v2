import { ErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceService } from "../services/workspace-service";
import { Workspaces } from "../core";
import { WORKSPACE_QUERY_KEY } from "../utilities";

export const useGetSingleWorkspace = (id: string) => {
  const workspaceService = new WorkspaceService();

  return useQuery<Workspaces, ErrorResponse>({
    queryFn: () => workspaceService.getSingle(id),
    queryKey: WORKSPACE_QUERY_KEY.concat([id]),
  });
};
