import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { workspaceCode: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { workspaceCode } = params;

    const workspace = await db.workspace.findFirstOrThrow({
      where: {
        code: workspaceCode,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "berhasil mengambil data workspace",
        },
        data: workspace,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
