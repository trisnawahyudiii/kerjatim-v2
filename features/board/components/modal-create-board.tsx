"use client";

import { Form, Formik } from "formik";
import { PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

// import * as Dialog from "@radix-ui/react-dialog";
import {
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
  // return (
  //   <>
  //     <Dialog.Root modal open={open} onOpenChange={setOpen}>
  //       <Tooltip>
  //         <TooltipTrigger asChild>
  //           <Dialog.Trigger asChild>
  //             <button className="relative flex items-center rounded-none px-4 py-2 text-base after:absolute after:bottom-0 after:left-0 after:top-0 after:w-0 after:bg-foreground hover:bg-transparent hover:after:w-1 hover:after:content-['']">
  //               <PlusCircle className="mr-2 h-5 w-5" /> Tambah Board
  //             </button>
  //           </Dialog.Trigger>
  //         </TooltipTrigger>
  //         <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
  //         <Dialog.DialogPortal>
  //           <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid h-fit w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-background shadow md:grid-cols-2">
  //             <div className="col-span-1 flex flex-col items-center justify-center gap-3 p-5">
  //               <Dialog.DialogTitle className="text-center text-xl font-bold">
  //                 Buat Board
  //               </Dialog.DialogTitle>

  //               <Formik
  //                 initialValues={initialValue}
  //                 validationSchema={boardValidationSchema}
  //                 onSubmit={onSubmit}
  //               >
  //                 <Form className="w-full">
  //                   <FormBoard />
  //                 </Form>
  //               </Formik>
  //             </div>
  //             <div className="col-span-1 hidden flex-col items-center justify-center gap-3 bg-zinc-200/80 p-5 text-center md:flex">
  //               <h1 className=" text-xl font-bold">
  //                 Mari Bangun <span className="text-foreground">Board</span>
  //               </h1>
  //               <p>
  //                 Tingkatkan produktivitas Anda dengan membuat daftar pekerjaan
  //                 secara efektif dan efisien
  //               </p>
  //               <Image
  //                 src="/buat-workspace-ils.png"
  //                 alt="buat workspace baru"
  //                 width={250}
  //                 height={300}
  //               />
  //             </div>
  //             <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
  //               <X className="h-4 w-4" />
  //             </Dialog.Close>
  //           </Dialog.Content>
  //         </Dialog.DialogPortal>
  //         <TooltipContent>
  //           <p>Create new workspace</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     </Dialog.Root>
  //   </>
  // );

  return (
    <>
      <Dialog modal open={open} onOpenChange={setOpen}>
        {/* trigger modal */}
        <DialogTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="relative flex items-center rounded-none px-4 py-2 text-base after:absolute after:bottom-0 after:left-0 after:top-0 after:w-0 after:bg-foreground hover:bg-transparent hover:after:w-1 hover:after:content-['']">
                <PlusCircle className="mr-2 h-5 w-5" /> Tambah Board{" "}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Create new Board</p>
            </TooltipContent>
          </Tooltip>
        </DialogTrigger>

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
          <div className="col-span-1 hidden flex-col items-center justify-center gap-3 bg-zinc-200/80 p-5 text-center md:flex">
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
