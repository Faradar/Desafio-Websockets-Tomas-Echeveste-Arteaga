import Services from "./class.services.js";
import { prodDao } from "../factory/factory.js";
import ProductRepository from "../factory/repository/product.repository.js";
const prodRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }

  // getAllProducts is for the product.websocket
  async getAllProducts() {
    try {
      return await prodDao.getAllProducts();
    } catch (error) {
      console.error(`Error in getAllProducts service: ${error.message}`);
      throw error;
    }
  }

  async getProducts(page, limit, sort, query) {
    try {
      return await prodDao.getProducts(page, limit, sort, query);
    } catch (error) {
      console.error(`Error in getProducts service: ${error.message}`);
      throw error;
    }
  }

  async getCategories() {
    try {
      const categories = await prodDao.getCategories();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const prod = await prodDao.getProductById(id);
      if (!prod) return false;
      else return prod;
    } catch (error) {
      console.error(`Error in getProductById service: ${error.message}`);
      throw error;
    }
  }

  async getDtoProductById(id) {
    try {
      const prod = await prodRepository.getDtoProductById(id);
      if (!prod) return false;
      else return prod;
    } catch (error) {
      console.error(`Error in getDtoProductById service: ${error.message}`);
      throw error;
    }
  }

  async updateProductStock(productId, newStock) {
    try {
      // Perform validation or other business logic if needed
      if (newStock < 0) {
        throw new Error("Invalid stock value");
      }

      // Use the DAO to update the product stock
      const updatedProduct = await prodDao.updateProductStock(
        productId,
        newStock
      );

      return updatedProduct;
    } catch (error) {
      console.error(`Error in updateProductStock service: ${error.message}`);
      throw error;
    }
  }
}
