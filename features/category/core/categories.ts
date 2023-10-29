import { BoardCategory } from "@prisma/client";

export type Categories = Partial<Pick<BoardCategory, "boardId" | "name">> & {
  id?: string;
};
