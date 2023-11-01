import * as yup from "yup";

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required("Nama kategori wajib diisi"),
  boardId: yup.string().required("boardId wajib diisi"),
});
