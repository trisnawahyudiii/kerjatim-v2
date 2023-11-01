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

    const { workspaceId } = params;
    const target = await db.workspace.findFirstOrThrow({
      where: {
        id: workspaceId,
      },
    });

    const members = await db.workspaceMember.findMany({
      where: {
        workspaceId: target.id,
      },
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
    });

    console.log("members", members);

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
