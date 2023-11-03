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

    const { user } = session;
    const { boardId } = params;

    const BoardUser = await db.boardUser.findFirstOrThrow({
      where: {
        userId: user.id,
        boardId: boardId,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengambil data board user",
        },
        data: BoardUser,
      }),
    );
  } catch (error) {
    return handleError(error, res);
  }
}
