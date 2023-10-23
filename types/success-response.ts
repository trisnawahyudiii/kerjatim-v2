export type SuccessResponse<T> = {
  meta: {
    success: boolean;
    message: string;
  };
  data: T;
};
