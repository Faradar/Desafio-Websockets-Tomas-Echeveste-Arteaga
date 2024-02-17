import { ProductModel } from "../persistence/daos/mongodb/product/product.model.js";
import { HttpResponse } from "../utils/http.response.js";
import errorsDictionary from "../utils/errors.dictionary.js";
const httpResponse = new HttpResponse();
import { devLogger } from "../utils/logger.js";

export const productValidator = async (req, res, next) => {
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

  try {
    const existingProduct = await ProductModel.findOne({ code: product.code });

    if (existingProduct) {
      validationErrors.push("Product with this code already exists");
    }
  } catch (error) {
    return httpResponse.ServerError(
      res,
      error,
      `Error checking product code uniqueness: ${error.message}`
    );
  }

  if (validationErrors.length > 0) {
    devLogger.error(
      `Required properties: title, description, code, price, stock, category. Validation errors: ${validationErrors}`
    );
    return httpResponse.BadRequest(
      res,
      { errors: validationErrors },
      "Invalid product"
    );
  } else {
    next();
  }
};

export const createValidator = async (req, res, next) => {
  const product = req.body;
  const { user } = req;
  if (user.role === "premium") {
    product.owner = user.email;
  }
  next();
};

export const updateValidator = async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  const { user } = req;
  if (!product) {
    return httpResponse.NotFound(res, product, errorsDictionary.PRODUCT_404);
  }

  if (user.role === "premium" && user.email === product.owner) {
    next();
  } else if (user.role === "admin" && user.role === product.owner) {
    next();
  } else {
    return httpResponse.Forbidden(
      res,
      user,
      "You are not the owner of this product"
    );
  }
};

export const deleteValidator = async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  const { user } = req;
  console.log(user);
  if (!product) {
    return httpResponse.NotFound(res, product, errorsDictionary.PRODUCT_404);
  }

  if (
    user.role === "admin" ||
    (user.role === "premium" && user.email === product.owner)
  ) {
    next();
  } else {
    return httpResponse.Forbidden(
      res,
      user,
      "You are not the owner of this product"
    );
  }
};
