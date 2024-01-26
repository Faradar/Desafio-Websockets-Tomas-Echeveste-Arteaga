import ProductService from "./product.services.js";
const service = new ProductService();
import CartService from "./cart.services.js";
const cartService = new CartService();

export default class ViewService {
  async getAllProducts() {
    try {
      return await service.getAllProducts();
    } catch (error) {
      throw new Error("Error in views getAllProducts service");
    }
  }

  async getProducts(page, limit, sort, query) {
    try {
      return await service.getProducts(page, limit, sort, query);
    } catch (error) {
      throw new Error("Error in views getProducts service");
    }
  }

  async getCategories() {
    try {
      const categories = await service.getCategories();
      return categories;
    } catch (error) {
      throw new Error("Error in views getCategories service");
    }
  }

  async getProductById(id) {
    try {
      return await service.getProductById(id);
    } catch (error) {
      throw new Error("Error in views getProductById service");
    }
  }

  async getCartById(id) {
    try {
      return await cartService.getCartById(id);
    } catch (error) {
      throw new Error("Error in views getCartById service");
    }
  }
}
