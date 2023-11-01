import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  LoadingComponent,
} from "@/components/ui";
import { Formik, Form } from "formik";
import { BoardMemberPayload } from "../core";
import { Dispatch, SetStateAction } from "react";
import { Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetWorkspaceMember } from "@/features/workspace/hooks";
import { BoardMemberForm } from ".";

type BoardMemberModalProps = {
  open: boolean;
  isFetching: boolean;
  initialValue: BoardMemberPayload;
  onSubmit: (values: BoardMemberPayload) => void;
  availableMember: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const BoardMemberModal = ({
  open,
  setOpen,
  isFetching,
  initialValue,
  availableMember,
  onSubmit,
}: BoardMemberModalProps) => {
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full px-2 py-1.5 hover:bg-slate-100">
        <Users className="mr-3 h-5 w-5" />
        Anggota
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center text-xl font-bold">
          Anggota Board
        </DialogTitle>
        {isFetching || !availableMember ? (
          <div className="flex h-full max-h-[514px] w-full items-center justify-center overflow-hidden">
            <LoadingComponent className="scale-50" />
          </div>
        ) : (
          <Formik initialValues={initialValue} onSubmit={onSubmit}>
            <Form>
              <BoardMemberForm workspaceMember={availableMember} />
            </Form>
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};
