import { AxiosError } from "axios";

export type ErrorResponse = AxiosError<{
  status: boolean;
  code: number;
  message: string;
  errorMessage: string[];
}>;
