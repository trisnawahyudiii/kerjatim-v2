import { Workspace } from "@prisma/client";

export type WorkspacePayload = Pick<Workspace, "name" | "description"> & {
  id?: string | null;
};
