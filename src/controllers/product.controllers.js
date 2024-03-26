import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import Controllers from "./class.controllers.js";
import ProductService from "../services/product.services.js";
const service = new ProductService();
import { userDao } from "../persistence/factory.js";
import EmailService from "../services/email.services.js";
const emailService = new EmailService();

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

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const item = await service.getById(id);
      if (!item)
        return httpResponse.NotFound(res, item, errorsDictionary.ITEM_404);
      else {
        const itemUpd = await service.delete(id);
        if (!itemUpd)
          return httpResponse.BadRequest(res, itemUpd, "Error deleting item");
        else {
          if (item.owner !== "admin") {
            const user = await userDao.getByEmail(item.owner);
            if (!user) {
              return httpResponse.NotFound(
                res,
                user,
                errorsDictionary.USER_404
              );
            }
            if (user.role === "premium") {
              const msg = `
                <h1>Product Deleted</h1>
                <p>Your product titled "${item.title}" has been deleted.</p>
                <p>Product Description: ${item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Stock: ${item.stock}</p>
                <p>Category: ${item.category}</p>
              `;
              await emailService.sendGmail(user.email, "Product Deleted", msg);
            }
          }
          return httpResponse.Ok(res, itemUpd, "Item deleted");
        }
      }
    } catch (error) {
      next(error);
    }
  }
}
