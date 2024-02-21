import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import Controllers from "./class.controllers.js";
import ProductService from "../services/product.services.js";
const service = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(service);
  }

  async getProducts(req, res, next) {
    try {
      const { page, limit, sort, query } = req.query;
      const products = await service.getProducts(page, limit, sort, query);
      const response = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `/api/products?page=${products.prevPage}` +
            (limit ? `&limit=${limit}` : "") +
            (sort ? `&sort=${sort}` : "") +
            (query ? `&query=${query}` : "")
          : null,
        nextLink: products.hasNextPage
          ? `/api/products?page=${products.nextPage}` +
            (limit ? `&limit=${limit}` : "") +
            (sort ? `&sort=${sort}` : "") +
            (query ? `&query=${query}` : "")
          : null,
      };
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await service.getProductById(id);
      if (!product) {
        return httpResponse.NotFound(
          res,
          product,
          errorsDictionary.PRODUCT_404
        );
      } else {
        return httpResponse.Ok(res, product);
      }
    } catch (error) {
      next(error);
    }
  }

  async getDtoProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await service.getDtoProductById(id);
      if (!product) {
        return httpResponse.NotFound(
          res,
          product,
          errorsDictionary.PRODUCT_404
        );
      } else {
        return httpResponse.Ok(res, product);
      }
    } catch (error) {
      next(error);
    }
  }

  async generateMockProduct(req, res, next) {
    try {
      const { amount } = req.query;
      const response = await service.generateMockProduct(amount);
      return httpResponse.Ok(res, { products: response });
    } catch (error) {
      next(error);
    }
  }
}
