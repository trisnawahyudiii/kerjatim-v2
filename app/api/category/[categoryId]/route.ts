import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } },
  res: Response,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { categoryId } = params;
    const target = await db.boardCategory.findFirstOrThrow({
      where: { id: categoryId },
    });

    const category = await db.boardCategory.delete({
      where: {
        id: target.id,
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil menghapus data kategori",
        },
        data: category,
      }),
    );
  } catch (error) {
    handleError(error, res);
  }
}
