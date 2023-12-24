import ProductService from "./product.services.js";
const service = new ProductService();
import CartService from "./cart.services.js";
const cartService = new CartService();

// import ProductDaoFS from "../daos/filesystem/product.dao.js";
// import { __dirname } from "../utils.js";
// const prodDao = new ProductDaoFS(
//   __dirname + "/daos/filesystem/data/products.json"
// );

export default class ViewService {
  async getAllProducts() {
    try {
      return await service.getAllProducts();
    } catch (error) {
      console.error(`Error in views getAllProducts service: ${error.message}`);
      throw error;
    }
  }

  async getProducts(page, limit, sort, query) {
    try {
      return await service.getProducts(page, limit, sort, query);
    } catch (error) {
      console.error(`Error in views getProducts service: ${error.message}`);
      throw error;
    }
  }

  async getCategories() {
    try {
      const categories = await service.getCategories();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      return await service.getProductById(id);
    } catch (error) {
      console.error(`Error in views getProductById service: ${error.message}`);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      return await cartService.getCartById(id);
    } catch (error) {
      console.error(`Error in views getCartById service: ${error.message}`);
      throw error;
    }
  }
}

// export const getAllProducts = async () => {
//   try {
//     return await service.getAllProducts();
//   } catch (error) {
//     console.error(`Error in views getAllProducts service: ${error.message}`);
//     throw error;
//   }
// };

// export const getProducts = async (page, limit, sort, query) => {
//   try {
//     return await service.getProducts(page, limit, sort, query);
//   } catch (error) {
//     console.error(`Error in views getProducts service: ${error.message}`);
//     throw error;
//   }
// };

// export const getCategories = async () => {
//   try {
//     const categories = await service.getCategories();
//     return categories;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getProductById = async (id) => {
//   try {
//     return await service.getProductById(id);
//   } catch (error) {
//     console.error(`Error in views getProductById service: ${error.message}`);
//     throw error;
//   }
// };

// export const getCartById = async (id) => {
//   try {
//     return await cartService.getCartById(id);
//   } catch (error) {
//     console.error(`Error in views getCartById service: ${error.message}`);
//     throw error;
//   }
// };
