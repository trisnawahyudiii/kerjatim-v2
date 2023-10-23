import { AxiosError } from "axios";

export type ErrorResponse = AxiosError<{
  success: boolean;
  message: string;
  details: string[];
}>;
