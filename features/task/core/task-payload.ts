import {
  TaskPriority,
  TaskProgress,
  TaskAssignee,
  Checklist,
  TaskComment,
} from "@prisma/client";

export type TaskPayload = {
  title: string;
  description?: string;
  categoryId: string;
  priority?: TaskPriority;
  progress?: TaskProgress;
  startedAt?: Date | null;
  endedAt?: Date | null;
  cheklist?: Pick<Checklist, "label" | "isChecked">[];
  taskComment?: Pick<TaskComment, "text">[];
  taskAssignee?: Pick<TaskAssignee, "userId">[];
};
