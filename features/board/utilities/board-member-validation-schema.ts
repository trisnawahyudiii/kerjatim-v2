import * as yup from "yup";

export const boardMemberValidationSchema = yup.object().shape({
  boardId: yup.string().required(),
  member: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one member must be selected")
    .required(),
});
