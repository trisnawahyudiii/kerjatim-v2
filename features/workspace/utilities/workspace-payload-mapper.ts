import { WorkspacePayload, Workspaces } from "../core";

export const workspacePayloadMapper = (
  values: Workspaces,
): WorkspacePayload => ({
  name: values.name!,
  description: values.description!,
});
