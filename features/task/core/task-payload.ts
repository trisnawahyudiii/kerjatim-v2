import {
  TaskPriority,
  TaskProgress,
  Checklist,
  TaskComment,
} from "@prisma/client";

export type TaskPayload = {
  title: string;
  description?: string | null;
  categoryId: string;
  priority?: TaskPriority;
  progress?: TaskProgress;
  startedAt?: Date | null;
  endedAt?: Date | null;
  cheklist?: Pick<Checklist, "label" | "isChecked">[];
  taskComment?: Pick<TaskComment, "text">[];
  taskAssignee?: { userId: string | undefined }[];
};
