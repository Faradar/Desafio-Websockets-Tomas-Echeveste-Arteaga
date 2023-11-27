export const errorHandler = (error, req, res, next) => {
  console.error(error);

  const status = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";

  res.status(status).json({ status: "error", message: errorMessage });
};
