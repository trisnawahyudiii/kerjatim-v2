import { Dispatch, SetStateAction } from "react";
import { Categories } from "../core/categories";
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
import { categoryValidationSchema } from "../utilities";
import { FormCategory } from "./form-category";

type CreateCategoryModalProps = {
  open: boolean;
  initialValue: Categories;
  onSubmit: (values: Categories) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalCreateCategory = ({
  open,
  initialValue,
  onSubmit,
  setOpen,
}: CreateCategoryModalProps) => {
  return (
    <Dialog open={open} modal onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-3 h-5 w-5" /> Tambah Kategori
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Formik
          initialValues={initialValue}
          validationSchema={categoryValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex w-full flex-col gap-5">
            <DialogTitle className="text-center text-xl font-bold">
              Buat Kategori
            </DialogTitle>

            <FormCategory />

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
