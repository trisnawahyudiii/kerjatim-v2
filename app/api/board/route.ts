import { RecordNotFoundError, db } from "@/lib";
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

    const { name, isPublic, workspaceId } = await req.json();

    const board = await db.board.create({
      data: {
        name,
        isPublic,
        workspaceId,
        BoardUser: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "berhasil membuat data board",
        },
        data: board,
      }),
      { status: 201 },
    );
  } catch (error) {
    handleError(error, res);
  }
}
