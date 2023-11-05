import { Dispatch, SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { Plus } from "lucide-react";
import { Form, Formik } from "formik";
import { FormTask } from ".";
import { taskValidationSchema } from "../utilities";
import { Tasks } from "../core";
import { BoardUser } from "@/features/board-user/core";

type CreateTaskModalProps = {
  open: boolean;
  initialValue: Tasks;
  onSubmit: (values: Tasks) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalCrateTask = ({
  open,
  initialValue,
  onSubmit,
  setOpen,
}: CreateTaskModalProps) => {
  return (
    <Dialog open={open} modal onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-3 h-5 w-5" /> Tambah Tugas
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit w-1/2 max-w-xl p-4 lg:max-w-4xl">
        <Formik
          initialValues={initialValue}
          validationSchema={taskValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex w-full flex-col gap-5">
            <DialogTitle className="text-center text-xl font-bold">
              Buat Tugas
            </DialogTitle>

            <FormTask />

            <DialogFooter>
              <Button onClick={() => setOpen(false)} variant="secondary">
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
