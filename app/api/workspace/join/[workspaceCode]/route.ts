import { DuplicateRecordError, db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function POST(
  req: Request,
  { params }: { params: { workspaceCode: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const { workspaceCode } = params;

    const target = await db.workspace.findFirstOrThrow({
      where: {
        code: workspaceCode,
      },
    });

    const exist = await db.workspaceMember.findFirst({
      where: {
        userId: user.id,
        workspaceId: target.id,
      },
    });

    if (exist) {
      throw new DuplicateRecordError("User");
    }

    const workspace = await db.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId: target.id,
        isAdmin: false,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil menambah user ke workspace",
        },
        data: workspace,
      }),
      { status: 201 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
