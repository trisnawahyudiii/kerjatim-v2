import { boardMemberValidationSchema } from "@/features/board/utilities";
import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(
  req: Request,

  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { boardId, member } =
      await boardMemberValidationSchema.validate(body);

    const target = await db.board.findFirstOrThrow({
      where: {
        id: boardId,
      },
    });

    const createPayload: Prisma.BoardUserCreateManyInput[] = member.map(
      (userId) => ({
        userId,
        boardId,
        isAdmin: false,
      }),
    );

    console.log("createPayload", createPayload);

    const memberResult = await db.boardUser.createMany({
      data: createPayload,
    });

    console.log(memberResult);

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
