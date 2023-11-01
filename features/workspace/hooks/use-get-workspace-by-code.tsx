import { ErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceService } from "../services/workspace-service";
import { Workspaces } from "../core";
import { WORKSPACE_QUERY_KEY } from "../utilities";

export const useGetWorkspaceByCode = (
  code: string,
  enabled: boolean = true,
) => {
  const workspaceService = new WorkspaceService();

  return useQuery<Workspaces, ErrorResponse>({
    queryFn: () => workspaceService.getByCode(code),
    queryKey: WORKSPACE_QUERY_KEY.concat([code]),
    enabled: enabled,
  });
};
