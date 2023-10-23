import * as yup from "yup";

export const authValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email wajib diisi"),
  terms: yup
    .boolean()
    .oneOf(
      [true],
      "Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi",
    ),
});
