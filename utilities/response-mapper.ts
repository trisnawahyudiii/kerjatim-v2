import { SuccessResponse } from "@/types";
import { AxiosResponse } from "axios";

export const responseMapper = <T>(
  response: AxiosResponse<SuccessResponse<T>>,
) => {
  return response.data.data;
};
