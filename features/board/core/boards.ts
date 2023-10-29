import { Board } from "@prisma/client";

export type Boards = Partial<
  Pick<Board, "id" | "name" | "isPublic" | "workspaceId">
>;
