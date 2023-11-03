import { taskValidationSchema } from "@/features/task/utilities";
import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      description,
      categoryId,
      priority,
      progress,
      startedAt,
      endedAt,
      taskAssignee,
      checkList,
    } = await taskValidationSchema.validate(body);

    const createPayload: Prisma.TaskCreateInput = {
      title,
      description,
      priority,
      progress,
      startedAt,
      endedAt,
      category: {
        connect: {
          id: categoryId,
        },
      },
    };

    if (taskAssignee) {
      const taskAssigneeData: Array<{ userId: string }> = taskAssignee!.map(
        (user) => ({
          userId: user!,
        }),
      );

      createPayload.TaskAssignee = {
        createMany: {
          data: taskAssigneeData,
        },
      };
    }

    if (checkList) {
      const checklistData: Array<{ label: string; isChecked: boolean }> =
        checkList!.map((item) => ({
          label: item.label!,
          isChecked: item.isCheked!,
        }));

      createPayload.Checklist = {
        createMany: {
          data: checklistData,
        },
      };
    }

    const task = await db.task.create({
      data: createPayload,
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil menambah data task",
        },
        data: task,
      }),
      { status: 201 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
