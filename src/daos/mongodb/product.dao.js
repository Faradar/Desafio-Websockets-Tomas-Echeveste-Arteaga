import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  // getAllProducts is for the product.websocket
  async getAllProducts() {
    try {
      const response = await ProductModel.find({}).lean();
      return response;
    } catch (error) {
      console.log(error);
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
        sort: sortObj,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
