interface CustomError extends Error {
  statusCode: number;
}

export const errorHandler = (
  statusCode: number,
  message: string,
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};
