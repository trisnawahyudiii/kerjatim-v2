import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function POST(
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
      select: {
        code: true,
      },
    });

    const url = `${process.env.NEXT_PUBLIC_APP_URL}/workspace/join/${target?.code}`;

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil membuat link invitation",
        },
        data: {
          url,
        },
      }),
    );
  } catch (error) {
    handleError(error, res);
  }
}
