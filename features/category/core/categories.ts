import { BoardCategory, Task } from "@prisma/client";

export type Categories = Partial<Pick<BoardCategory, "boardId" | "name">> & {
  id?: string;
  Task?: Task[];
};
