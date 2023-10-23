import { NextApiResponse } from "next";
import { ValidationError } from "yup";
import {
  RecordNotFoundError,
  DuplicateRecordError,
  InsufficentArgumentError,
} from "lib";

export function handleError(error: any, res: Response) {
  if (error instanceof ValidationError) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
        errors: error.errors,
      }),
      { status: 400 },
    );
  }

  if (error instanceof InsufficentArgumentError) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
        errors: error.details,
      }),
      { status: 400 },
    );
  }

  if (error instanceof DuplicateRecordError) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
        errors: error.details,
      }),
      { status: 409 },
    );
  }

  if (error instanceof RecordNotFoundError) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
        errors: error.details,
      }),
      { status: 404 },
    );
  }

  return new Response(
    JSON.stringify({
      success: false,
      message: error.message || "Internal server error",
      error,
    }),
    { status: 500 },
  );
}
