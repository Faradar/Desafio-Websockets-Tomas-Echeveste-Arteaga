import Services from "./class.services.js";
import { prodDao } from "../persistence/persistence.js";

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

  // async createProduct(obj) {
  //   try {
  //     const newProd = await prodDao.create(obj);
  //     if (!newProd) return false;
  //     else return newProd;
  //   } catch (error) {
  //     console.error(`Error in createProduct service: ${error.message}`);
  //     throw error;
  //   }
  // }

  // async updateProduct(id, obj) {
  //   try {
  //     const prodUpd = await prodDao.updateProduct(id, obj);
  //     if (!prodUpd) return false;
  //     else return prodUpd;
  //   } catch (error) {
  //     console.error(`Error in updateProduct service: ${error.message}`);
  //     throw error;
  //   }
  // }

  // async deleteProduct(id) {
  //   try {
  //     const prodDel = await prodDao.delete(id);
  //     if (!prodDel) return false;
  //     else return prodDel;
  //   } catch (error) {
  //     console.error(`Error in deleteProduct service: ${error.message}`);
  //     throw error;
  //   }
  // }
}

// getAllProducts is for the product.websocket
// export const getAllProducts = async () => {
//   try {
//     return await prodDao.getAllProducts();
//   } catch (error) {
//     console.error(`Error in getAllProducts service: ${error.message}`);
//     throw error;
//   }
// };

// export const getProducts = async (page, limit, sort, query) => {
//   try {
//     return await prodDao.getProducts(page, limit, sort, query);
//   } catch (error) {
//     console.error(`Error in getProducts service: ${error.message}`);
//     throw error;
//   }
// };

// export const getCategories = async () => {
//   try {
//     const categories = await prodDao.getCategories();
//     return categories;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getProductById = async (id) => {
//   try {
//     const prod = await prodDao.getProductById(id);
//     if (!prod) return false;
//     else return prod;
//   } catch (error) {
//     console.error(`Error in getProductById service: ${error.message}`);
//     throw error;
//   }
// };

// export const createProduct = async (obj) => {
//   try {
//     // if (
//     //   !obj.title ||
//     //   !obj.description ||
//     //   !obj.price ||
//     //   !obj.thumbnails ||
//     //   !obj.code ||
//     //   !obj.stock
//     // ) {
//     //   throw new Error("Missing fields");
//     // }
//     const newProd = await prodDao.create(obj);
//     if (!newProd) return false;
//     else return newProd;
//   } catch (error) {
//     console.error(`Error in createProduct service: ${error.message}`);
//     throw error;
//   }
// };

// export const updateProduct = async (id, obj) => {
//   try {
//     const prodUpd = await prodDao.updateProduct(id, obj);
//     if (!prodUpd) return false;
//     else return prodUpd;
//   } catch (error) {
//     console.error(`Error in updateProduct service: ${error.message}`);
//     throw error;
//   }
// };

// export const deleteProduct = async (id) => {
//   try {
//     const prodDel = await prodDao.delete(id);
//     if (!prodDel) return false;
//     else return prodDel;
//   } catch (error) {
//     console.error(`Error in deleteProduct service: ${error.message}`);
//     throw error;
//   }
// };
