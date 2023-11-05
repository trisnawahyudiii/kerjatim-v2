import { User } from "@/features/workspace/core";
import { Checklist, Task, TaskComment } from "@prisma/client";
import type { Prisma, TaskAssignee as PtaskAssignee } from "@prisma/client";

export type TaskAssignee = Prisma.TaskAssigneeGetPayload<{
  select: {
    id: true;
    user: {
      select: {
        id: true;
        name: true;
        email: true;
        image: true;
      };
    };
  };
}>;

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
  taskAssignee?: TaskAssignee[];
};

export type TaskWithAttributes = Prisma.TaskGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    priority: true;
    progress: true;
    startedAt: true;
    endedAt: true;
    Checklist: {
      select: {
        id: true;
        label: true;
        isChecked: true;
      };
    };
    TaskAssignee: {
      select: {
        id: true;
        user: {
          select: {
            id: true;
            name: true;
            email: true;
            image: true;
          };
        };
      };
    };
    TaskComment: true;
  };
}>;
