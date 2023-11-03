import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

// update
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { id } = params;
    const { user } = session;

    const target = await db.boardUser.findFirstOrThrow({
      where: {
        id,
      },
    });

    const currentUser = await db.boardUser.findFirstOrThrow({
      where: {
        userId: user.id,
        boardId: target.boardId,
      },
    });

    if (!currentUser.isAdmin) {
      return new Response(
        JSON.stringify({
          meta: {
            success: false,
            message: "You are not an Admin for this board.",
            error: [],
          },
        }),
      );
    }

    if (target.userId === user.id) {
      return new Response(
        JSON.stringify({
          meta: {
            success: false,
            message: "you cannot demote yourself",
          },
          data: [],
        }),
      );
    }

    const boardUser = await db.boardUser.update({
      where: { id: target.id },
      data: {
        isAdmin: !target.isAdmin,
      },
    });

    return new Response(
      JSON.stringify({
        meta: { success: true, message: "Berhasil mengubah data BoardUser" },
        data: boardUser,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}

// delete
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { id } = params;
    const { user } = session;

    const target = await db.boardUser.findFirstOrThrow({
      where: {
        id,
      },
    });

    const currentUser = await db.boardUser.findFirstOrThrow({
      where: {
        userId: user.id,
        boardId: target.boardId,
      },
    });

    if (!currentUser.isAdmin) {
      return new Response(
        JSON.stringify({
          meta: {
            success: false,
            message: "You are not an Admin for this board.",
            error: [],
          },
        }),
      );
    }

    const boardUser = await db.boardUser.delete({
      where: { id: target.id },
    });

    return new Response(
      JSON.stringify({
        meta: { success: true, message: "Berhasil menghapus data BoardUser" },
        data: boardUser,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
