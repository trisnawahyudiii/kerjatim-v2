"use client";

import { Form, Formik } from "formik";
import { PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

// import * as Dialog from "@radix-ui/react-dialog";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { FormBoard } from ".";
import { Boards } from "../core";
import { boardValidationSchema } from "../utilities";

type CreateBoardModalProps = {
  open: boolean;
  initialValue: Boards;
  onSubmit: (values: Boards) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalCreateBoard = ({
  open,
  initialValue,
  onSubmit,
  setOpen,
}: CreateBoardModalProps) => {
  return (
    <>
      <Dialog modal open={open} onOpenChange={setOpen}>
        <Tooltip>
          {/* trigger modal */}
          <DialogTrigger asChild>
            <TooltipTrigger>
              <Button
                variant="ghost"
                className="relative flex items-center rounded-none px-4 py-2 text-base after:absolute after:bottom-0 after:left-0 after:top-0 after:w-0 after:bg-foreground hover:bg-transparent hover:after:w-1 hover:after:content-['']"
              >
                <PlusCircle className="mr-2 h-5 w-5" /> Tambah Board{" "}
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="right">
            <p>Create new Board</p>
          </TooltipContent>
        </Tooltip>

        {/* content */}
        <DialogContent className="grid h-fit w-1/2 max-w-xl bg-background p-0 md:grid-cols-2 lg:max-w-4xl">
          <div className="col-span-1 flex flex-col items-center justify-center gap-3 p-5">
            <DialogTitle className="text-center text-xl font-bold">
              Buat Board
            </DialogTitle>

            <Formik
              initialValues={initialValue}
              validationSchema={boardValidationSchema}
              onSubmit={onSubmit}
            >
              <Form className="w-full">
                <FormBoard />
              </Form>
            </Formik>
          </div>
          <div className="col-span-1 hidden flex-col items-center justify-center gap-3 bg-zinc-200/80 p-10 text-center md:flex">
            <h1 className=" text-xl font-bold">
              Merancang <span className="text-foreground">Board</span> Anda
            </h1>
            <p>
              Temukan orang untuk dapat terlibat dalam penyelesaian board di
              satu lokasi.
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
