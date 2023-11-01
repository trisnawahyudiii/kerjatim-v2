import { RecordNotFoundError, db } from "@/lib";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// get single
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const { id } = params;

    const board = await db.board.findFirst({
      where: { id },
      select: {
        name: true,
        isPublic: true,
        BoardCategory: {
          select: {
            Task: {
              select: {
                id: true,
                title: true,
                priority: true,
                progress: true,
                description: true,
                startedAt: true,
                endedAt: true,
                TaskAssignee: {
                  select: {
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
        },
        BoardUser: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
              },
            },
            isAdmin: true,
          },
        },
      },
    });

    if (!board) {
    }
    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "berhasil mengambil data board",
        },
        data: board,
      }),
      { status: 200 },
    );
  } catch (error) {
    handleError(error, res);
  }
}
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
    const { name, isPublic } = await req.json();

    const targetBoard = await db.board.findFirstOrThrow({
      where: {
        id: id,
      },
    });

    const board = await db.board.update({
      where: { id: targetBoard.id },
      data: {
        name,
        isPublic,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengubah data board",
        },
        data: board,
      }),
      { status: 200 },
    );
  } catch (error) {
    handleError(error, res);
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

    const targetBoard = await db.board.findFirstOrThrow({
      where: {
        id: id,
      },
    });

    const board = await db.board.delete({
      where: { id: targetBoard.id },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil menghapus data board",
        },
        data: board,
      }),
      { status: 204 },
    );
  } catch (error) {
    handleError(error, res);
  }
}
