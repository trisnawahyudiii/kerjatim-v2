import * as yup from "yup";

export const boardMemberValidationSchema = yup.object().shape({
  userId: yup.string().required(),
  boardId: yup.string().required(),
  workspaceId: yup.string().required(),
});
