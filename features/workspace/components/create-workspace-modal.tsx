"use client";

import { Form, Formik } from "formik";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Button, DialogTitle } from "@/components/ui";
import * as Dialogprimitive from "@radix-ui/react-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui";

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
      <Dialog modal open={open} onOpenChange={setOpen}>
        {/* trigger modal */}
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="default" size="icon">
                <AiOutlinePlus />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="right">
            <p>Create new orkspace</p>
          </TooltipContent>
        </Tooltip>

        {/* content */}
        <DialogContent className="grid h-fit w-1/2 max-w-xl bg-background p-0 md:grid-cols-2 lg:max-w-4xl">
          <div className="col-span-1 flex flex-col items-center justify-center gap-3 p-5">
            <DialogTitle className="text-center text-xl font-bold">
              Buat Workspace
            </DialogTitle>

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
          <div className="col-span-1 hidden flex-col items-center justify-center gap-3 bg-zinc-200/80 p-8 text-center md:flex">
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
        </DialogContent>
      </Dialog>
    </>
  );
};
