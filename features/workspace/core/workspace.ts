import { Boards } from "@/features/board/core";
import { Workspace } from "@prisma/client";

export type Workspaces = Partial<
  Pick<Workspace, "name" | "code" | "description" | "id" | "userId">
> & {
  id?: string | null;
  Board?: Boards[]
};
