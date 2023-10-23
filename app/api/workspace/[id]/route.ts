import { RecordNotFoundError, db } from "@/lib";
import { handleError } from "@/utilities/handle-error";
import { getServerSession } from "next-auth";

// get single
export async function GET(req: Request, res: Response) {
  try {
    const session = getServerSession();

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { id } = await req.json();

    const workspace = await db.workspace.findFirst({
      where: { id: id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
        WorkspaceMember: {
          select: {
            isAdmin: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!workspace) {
      throw new RecordNotFoundError("workspace");
    }

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengambil data workspace",
        },
        data: workspace,
      }),
    );
  } catch (error) {
    handleError(error, res);
  }
}

// update
export async function PUT(req: Request, res: Response) {
  try {
    const session = getServerSession();

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { name, description, id } = await req.json();

    const targetWorkspace = await db.workspace.findFirst({
      where: { id: id },
      select: { id: true },
    });

    if (!targetWorkspace) {
      throw new RecordNotFoundError("workspace");
    }

    const workspace = await db.workspace.update({
      where: { id: targetWorkspace?.id },
      data: { name, description },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
        WorkspaceMember: {
          select: {
            isAdmin: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengubah data workspace",
        },
        data: workspace,
      }),
    );
  } catch (error) {
    handleError(error, res);
  }
}

// delete
export async function DELETE(req: Request, res: Response) {
  try {
    const session = getServerSession();

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { name, description, id } = await req.json();

    const targetWorkspace = await db.workspace.findFirst({
      where: { id: id },
      select: { id: true },
    });

    if (!targetWorkspace) {
      throw new RecordNotFoundError("workspace");
    }

    const workspace = await db.workspace.delete({
      where: { id: targetWorkspace.id },
    });

    if (workspace) {
      return new Response(
        JSON.stringify({
          meta: {
            success: true,
            message: "Berhasil menghapus data workspace",
          },
          data: workspace,
        }),
      );
    }
  } catch (error) {
    handleError(error, res);
  }
}
