import { CategoryPayload } from "../core";
import { Categories } from "../core/categories";

export const categoryPayloadMapper = (values: Categories): CategoryPayload => ({
  name: values.name!,
  boardId: values.boardId!,
});
