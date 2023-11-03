import { boardMemberValidationSchema } from "@/features/board/utilities";
import { DuplicateRecordError, db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const body = await req.json();
    const { boardId, userId, workspaceId } =
      await boardMemberValidationSchema.validate(body);

    const target = await db.board.findFirstOrThrow({
      where: {
        id: boardId,
      },
    });

    const currentUser = await db.workspaceMember.findFirstOrThrow({
      where: {
        userId: user.id,
        workspaceId: workspaceId,
      },
    });

    if (!currentUser.isAdmin) {
      return new Response(
        JSON.stringify({
          meta: {
            success: false,
            message: "You are not an Admin for the workspace",
            error: [],
          },
        }),
      );
    }

    const exist = await db.boardUser.findFirst({
      where: {
        userId,
        boardId,
      },
    });

    if (exist) {
      throw new DuplicateRecordError("member");
    }

    const targetUser = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const memberResult = await db.boardUser.create({
      data: {
        userId: targetUser.id,
        boardId: boardId,
        isAdmin: false,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil menambah data anggota",
        },
        data: memberResult,
      }),
      { status: 201 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
