import { User } from "@/features/workspace/core";
import { Checklist, Task, TaskComment } from "@prisma/client";

export type Tasks = Partial<
  Pick<
    Task,
    | "title"
    | "description"
    | "categoryId"
    | "priority"
    | "progress"
    | "startedAt"
    | "endedAt"
  >
> & {
  id?: string;
  checkList?: Partial<Checklist>[];
  taskComment?: Partial<TaskComment>[];
  taskAssignee?: {
    user: User;
  }[];
};
