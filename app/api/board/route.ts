import { boardValidationSchema } from "@/features/board/utilities";
import { RecordNotFoundError, db } from "@/lib";
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

    const { user } = session;

    const body = await req.json();
    const { name, isPublic, workspaceId } =
      await boardValidationSchema.validate(body);

    const createPayload: Prisma.BoardCreateInput = {
      name,
      isPublic,
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
    };

    if (isPublic) {
      const workspaceMember = await db.workspaceMember.findMany({
        where: { workspaceId: workspaceId },
      });

      createPayload.BoardUser = {
        createMany: {
          data: workspaceMember.map((member) => ({
            userId: member.userId,
            isAdmin: false,
          })),
          skipDuplicates: true,
        },
      };
    } else {
      createPayload.BoardUser = {
        create: {
          userId: user.id,
          isAdmin: true,
        },
      };
    }

    const board = await db.board.create({
      data: createPayload,
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
