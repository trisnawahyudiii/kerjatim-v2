import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { workspaceId: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const { workspaceId } = params;

    if (!workspaceId) {
      return new Response(
        JSON.stringify({
          meta: {
            success: false,
            message: "workspaceId wajib diisi",
          },
          data: null,
        }),
      );
    }

    const board = await db.board.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                BoardUser: {
                  some: {
                    userId: user.id,
                  },
                },
              },
              {
                workspaceId: workspaceId,
              },
            ],
          },
          { isPublic: true },
        ],
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        isPublic: true,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengambil data board",
        },
        data: board,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
