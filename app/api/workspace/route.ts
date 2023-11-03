import { workspaceValidationSchema } from "@/features/workspace/utilities";
import { DuplicateRecordError, db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
//list
export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const workspaces = await db.workspace.findMany({
      where: {
        WorkspaceMember: {
          some: {
            userId: user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        User: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil mengambil data workspace",
        },
        data: workspaces,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}

// create
export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const { user } = session;
    const body = await req.json();
    const { name, description } =
      await workspaceValidationSchema.validate(body);

    const exist = await db.workspace.findFirst({
      where: { name },
    });

    if (exist) {
      throw new DuplicateRecordError(name);
    }

    let workspaceInput: Prisma.WorkspaceCreateInput = {
      name,
      description,
      User: {
        connect: {
          id: user.id,
        },
      },
      WorkspaceMember: {
        create: {
          userId: user.id,
          isAdmin: true,
        },
      },
    };

    const workspace = await db.workspace.create({
      data: workspaceInput,
    });

    return new Response(
      JSON.stringify({
        meta: {
          success: true,
          message: "Berhasil menambah data workspace",
        },
        data: workspace,
      }),
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, res);
  }
}
