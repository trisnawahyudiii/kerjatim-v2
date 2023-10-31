import { Checklist, Task, TaskAssignee, TaskComment } from "@prisma/client";

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
  taskAssignee?: Pick<TaskAssignee, "userId">[];
};
