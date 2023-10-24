"use client";

import { Form, Formik } from "formik";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Button } from "@/components/ui";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import { Workspaces } from "../core";
import { workspaceValidationSchema } from "../utilities";
import { FormWorkspace } from "./";

type CreateWorkspaceModalProps = {
  open: boolean;
  initialValue: Workspaces;
  onSubmit: (values: Workspaces) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const CreateWorkspaceModal = ({
  open,
  initialValue,
  onSubmit,
  setOpen,
}: CreateWorkspaceModalProps) => {
  return (
    <>
      <Dialog.Root modal>
        <Tooltip>
          <TooltipTrigger>
            <Dialog.Trigger asChild>
              <Button variant="default" size="icon">
                <AiOutlinePlus />
              </Button>
            </Dialog.Trigger>
          </TooltipTrigger>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.DialogPortal>
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-background shadow md:grid-cols-2">
              <div className="col-span-1 flex flex-col items-center justify-center gap-3 p-5">
                <Dialog.DialogTitle className="text-center text-xl font-bold">
                  Buat Workspace
                </Dialog.DialogTitle>

                <Formik
                  initialValues={initialValue}
                  validationSchema={workspaceValidationSchema}
                  onSubmit={onSubmit}
                >
                  <Form className="w-full">
                    <FormWorkspace />
                  </Form>
                </Formik>
              </div>
              <div className="col-span-1 hidden flex-col items-center justify-center gap-3 bg-zinc-200/80 p-5 text-center md:flex">
                <h1 className=" text-xl font-bold">
                  Mari Bangun <span className="text-foreground">Workspace</span>
                </h1>
                <p>
                  Tingkatkan produktivitas Anda dengan membuat daftar pekerjaan
                  secara efektif dan efisien
                </p>
                <Image
                  src="/buat-workspace-ils.png"
                  alt="buat workspace baru"
                  width={250}
                  height={300}
                />
              </div>
              <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.DialogPortal>
        </Tooltip>
      </Dialog.Root>
    </>
  );
};
