import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { categoryId } = params;
    const target = await db.boardCategory.findFirstOrThrow({
      where: {
        id: categoryId,
      },
    });

    const tasks = await db.task.findMany({
      where: {
        categoryId: target.id,
      },

      select: {
        id: true,
        categoryId: true,
        title: true,
        description: true,
        startedAt: true,
        endedAt: true,
        priority: true,
        progress: true,
        createdAt: true,
        updatedAt: true,
        Checklist: true,
        TaskAssignee: true,
        TaskComment: true,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengambil data tasks",
        },
        data: tasks,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
