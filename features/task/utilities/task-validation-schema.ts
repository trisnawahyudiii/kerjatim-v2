import * as yup from "yup";
import { TaskPriority, TaskProgress, Checklist } from "@prisma/client";
export const taskValidationSchema = yup.object().shape({
  title: yup.string().required("Judul tugas wajib diisi"),
  description: yup.string(),
  categoryId: yup.string().required("CategoryId wajib diisi"),
  priority: yup
    .string()
    .oneOf(Object.values(TaskPriority), "Invalid enum value"),
  progress: yup
    .string()
    .oneOf(Object.values(TaskProgress), "Invalid enum value"),
  startedAt: yup.date().optional(),
  endedAt: yup.date().optional(),
  checkList: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        isCheked: yup.boolean(),
      }),
    )
    .optional(),
  taskAssignee: yup.array().of(yup.string()).optional(),
});
