import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  // getAllProducts is for the product.websocket
  async getAllProducts() {
    try {
      const response = await ProductModel.find({}).lean();
      return response;
    } catch (error) {
      console.error(`Error fetching all products: ${error.message}`);
      throw error;
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
      console.error(`Error fetching products with queries: ${error.message}`);
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await ProductModel.distinct("category");
      return response;
    } catch (error) {
      console.error(`Error fetching categories: ${error.message}`);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id).lean();
      return response;
    } catch (error) {
      console.error(`Error fetching product by ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.error(`Error creating product with obj ${obj}: ${error.message}`);
      throw error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.error(`Error updating product with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}: ${error.message}`);
      throw error;
    }
  }
}
