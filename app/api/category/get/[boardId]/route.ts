import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { boardId: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { boardId } = params;
    const categories = await db.boardCategory.findMany({
      where: { boardId },
      select: {
        id: true,
        name: true,
        Task: {
          select: {
            id: true,
            title: true,
            description: true,
            priority: true,
            progress: true,
            startedAt: true,
            endedAt: true,
            Checklist: {
              select: {
                id: true,
                label: true,
                isChecked: true,
              },
            },
            TaskAssignee: {
              select: {
                id: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
            TaskComment: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengambil data category",
        },
        data: categories,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
