import { boardPayload, Boards } from "../core";

export const boardPayloadMapper = (values: Boards): boardPayload => ({
  name: values.name!,
  isPublic: values.isPublic!,
  workspaceId: values.workspaceId!,
});
