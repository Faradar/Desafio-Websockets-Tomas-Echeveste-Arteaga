import Daos from "../class.dao.js";
import { ProductModel } from "./product.model.js";

export default class ProductDaoMongoDB extends Daos {
  constructor() {
    super(ProductModel);
  }

  // getAllProducts is for the product.websocket
  async getAllProducts() {
    try {
      const response = await ProductModel.find({}).lean();
      return response;
    } catch (error) {
      throw new Error("Error in getAllProducts dao");
    }
  }

  async getProducts(page = 1, limit = 10, sort, query) {
    try {
      const queryObj = query ? { category: query } : {};
      const sortObj = sort
        ? sort === "asc"
          ? { price: 1 }
          : sort === "desc"
          ? { price: -1 }
          : {}
        : {};
      const response = await ProductModel.paginate(queryObj, {
        page,
        limit,
        lean: true,
        sort: sortObj,
      });
      return response;
    } catch (error) {
      throw new Error("Error in getProducts dao");
    }
  }

  async getCategories() {
    try {
      const response = await ProductModel.distinct("category");
      return response;
    } catch (error) {
      throw new Error("Error in getCategories dao");
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id).lean();
      return response;
    } catch (error) {
      throw new Error("Error in getProductById dao");
    }
  }

  async updateProductStock(productId, newStock) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { $set: { stock: newStock } },
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error("Error in updateProductStock dao");
    }
  }
}
