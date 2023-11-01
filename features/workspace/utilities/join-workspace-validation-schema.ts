import * as yup from "yup";

export const joinWorkspaceValidationSchema = yup.object().shape({
  workspaceCode: yup.string().required("Kode workspace wajib diisi"),
});
