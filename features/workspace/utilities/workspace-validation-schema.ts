import * as yup from "yup";

export const workspaceValidationSchema = yup.object().shape({
  name: yup.string().required("Nama workspace wajib diisi"),
  description: yup.string().optional(),
});
