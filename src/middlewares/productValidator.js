import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export const productValidator = (req, res, next) => {
  const product = req.body;
  const validationErrors = [];

  if (product.title === undefined || typeof product.title !== "string") {
    validationErrors.push("Title must be a non-empty string");
  }

  if (
    product.description === undefined ||
    typeof product.description !== "string"
  ) {
    validationErrors.push("Description must be a non-empty string");
  }

  if (product.code === undefined || typeof product.code !== "string") {
    validationErrors.push("Code must be a non-empty string");
  }

  if (
    product.price === undefined ||
    typeof product.price !== "number" ||
    product.price <= 0
  ) {
    validationErrors.push("Price must be a positive number");
  }

  if (
    product.stock === undefined ||
    typeof product.stock !== "number" ||
    product.stock < 0
  ) {
    validationErrors.push("Stock must be a non-negative number");
  }

  if (product.category === undefined || typeof product.category !== "string") {
    validationErrors.push("Category must be a non-empty string.");
  }
  if (validationErrors.length > 0) {
    return httpResponse.BadRequest(
      res,
      { errors: validationErrors },
      "Invalid product"
    );
  } else {
    next();
  }
};
