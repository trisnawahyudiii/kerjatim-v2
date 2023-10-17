export type SuccessResponse<T> = {
  status: boolean;
  code: number;
  message: string;
  payload: T;
};
