import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
  return httpResponse.ServerError(res, error, error.message);
};

// export const errorHandler = (error, req, res, next) => {
//   console.error(error);

//   const status = error.statusCode || 500;
//   const errorMessage = error.message || "Internal Server Error";

//   res.status(status).json({ status: "error", message: errorMessage });
// };
