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

    const target = await db.board.findFirstOrThrow({
      where: {
        id: boardId,
      },
    });

    const members = await db.boardUser.findMany({
      where: {
        boardId: target.id,
      },
      select: {
        id: true,
        isAdmin: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengambil data anggota",
        },
        data: members,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
