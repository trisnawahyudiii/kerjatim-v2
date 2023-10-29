import { categoryValidationSchema } from "@/features/category/utilities";
import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { name, boardId } = await categoryValidationSchema.validate(body);

    const category = await db.boardCategory.create({
      data: {
        name,
        boardId,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil membuat data category",
        },
        data: category,
      }),
      { status: 201 },
    );
  } catch (error) {
    handleError(error, res);
  }
}
