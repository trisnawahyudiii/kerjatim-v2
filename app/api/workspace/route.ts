import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { handleError } from "@/utilities/handle-error";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
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
        userId: user.id,
      },
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
          message: "Berhasil mengambil data workspace",
        },
        data: workspaces,
      }),
      { status: 200 },
    );
  } catch (error) {
    handleError(error, res);
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
    const { name, description } = await req.json();

    console.log("create workspace: ", name, description);

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
    handleError(error, res);
  }
}
