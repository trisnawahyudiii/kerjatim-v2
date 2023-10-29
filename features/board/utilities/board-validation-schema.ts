import * as yup from "yup";

export const boardValidationSchema = yup.object().shape({
  name: yup.string().required("Nama board wajib diisi"),
  isPublic: yup.boolean().required("Jenis board wajib dipilih"),
  workspaceId: yup.string().required("WorkspaceId wajib diisi"),
});
