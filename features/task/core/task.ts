import { Checklist, Task, TaskComment, User } from "@prisma/client";

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
    id?: string;
    user: Pick<User, "id" | "name" | "email" | "image">;
  }[];
};
