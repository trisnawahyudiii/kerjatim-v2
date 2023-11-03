import { ErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { WorkspaceService } from "../services/workspace-service";
import { WorkspaceUser } from "../core";
import { WORKSPACE_QUERY_KEY } from "../utilities";

export const useGetWorkspaceMember = (
  workspaceId: string,
  enabled: boolean = true,
) => {
  const workspaceService = new WorkspaceService();

  return useQuery<WorkspaceUser[], ErrorResponse>({
    queryFn: () => workspaceService.getMember(workspaceId),
    queryKey: WORKSPACE_QUERY_KEY.concat(["member"]).concat([workspaceId]),
    enabled: enabled,
  });
};
