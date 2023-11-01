import { TaskPayload, Tasks } from "../core";

export const taskPayloadMapper = (values: Tasks): TaskPayload => ({
  title: values.title!,
  description: values.description,
  categoryId: values.categoryId!,
  priority: values.priority,
  progress: values.progress,
  startedAt: values.startedAt,
  endedAt: values.endedAt,
  taskAssignee: values.taskAssignee?.map((user) => ({ userId: user.id })),
});
