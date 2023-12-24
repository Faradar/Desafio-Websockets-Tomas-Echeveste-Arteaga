import Services from "./class.services.js";
import ProductService from "./product.services.js";
const service = new ProductService();
import CartDaoMongoDB from "../daos/mongodb/cart/cart.dao.js";
const cartDao = new CartDaoMongoDB();
import { Types } from "mongoose";

// import CartDaoFS from "../daos/filesystem/cart.dao.js";
// import { __dirname } from "../utils.js";
// const cartDao = new CartDaoFS(
//   __dirname + "/daos/filesystem/data/carts.json"
// );

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  async getCartById(id) {
    try {
      const cart = await cartDao.getCartById(id);
      if (!cart) return false;
      else return cart;
    } catch (error) {
      console.error(`Error in getCartById service: ${error.message}`);
      throw error;
    }
  }

  async saveProductToCart(idCart, idProd) {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      const productExists = await service.getProductById(idProd);
      if (cartExists) {
        if (productExists) {
          return await cartDao.saveProductToCart(idCart, idProd);
        } else {
          console.log("Product not found");
        }
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error(`Error in saveProductToCart service: ${error.message}`);
      throw error;
    }
  }

  async updateCart(idCart, newProducts) {
    try {
      if (!Array.isArray(newProducts)) {
        throw new Error("Invalid products array");
      }
      newProducts.forEach((product) => {
        if (
          !product.product ||
          !Types.ObjectId.isValid(product.product) ||
          !Number.isInteger(product.quantity) ||
          product.quantity <= 0
        ) {
          throw new Error("Invalid product format");
        }
      });
      const updatedCart = await cartDao.updateCart(idCart, newProducts);
      return updatedCart;
    } catch (error) {
      console.error(`Error in updateCart service: ${error.message}`);
      throw error;
    }
  }

  async updateProductQuantity(idCart, idProd, quantity) {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      const productExists = await service.getProductById(idProd);
      if (cartExists) {
        if (productExists) {
          return await cartDao.updateProductQuantity(idCart, idProd, quantity);
        } else {
          console.log("Product not found");
        }
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error(`Error in updateProductQuantity service: ${error.message}`);
      throw error;
    }
  }

  async deleteProductsFromCart(idCart) {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      if (cartExists) {
        return await cartDao.deleteProductsFromCart(idCart);
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error(
        `Error in deleteProductsFromCart service: ${error.message}`
      );
      throw error;
    }
  }

  async deleteProductFromCart(idCart, idProd) {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      const productExists = await service.getProductById(idProd);
      if (cartExists) {
        if (productExists) {
          return await cartDao.deleteProductFromCart(idCart, idProd);
        } else {
          console.log("Product not found");
        }
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error(`Error in deleteProductFromCart service: ${error.message}`);
      throw error;
    }
  }
}

// export const getCarts = async () => {
//   try {
//     return await cartDao.getAll();
//   } catch (error) {
//     console.error(`Error in getCarts service: ${error.message}`);
//     throw error;
//   }
// };

// export const getCartById = async (id) => {
//   try {
//     const cart = await cartDao.getCartById(id);
//     if (!cart) return false;
//     else return cart;
//   } catch (error) {
//     console.error(`Error in getCartById service: ${error.message}`);
//     throw error;
//   }
// };

// export const createCart = async (obj) => {
//   try {
//     const newCart = await cartDao.create(obj);
//     if (!newCart) return false;
//     else return newCart;
//   } catch (error) {
//     console.error(`Error in createCart service: ${error.message}`);
//     throw error;
//   }
// };

// export const saveProductToCart = async (idCart, idProd) => {
//   try {
//     const cartExists = await cartDao.getCartById(idCart);
//     const productExists = await service.getProductById(idProd);
//     if (cartExists) {
//       if (productExists) {
//         return await cartDao.saveProductToCart(idCart, idProd);
//       } else {
//         console.log("Product not found");
//       }
//     } else {
//       console.log("Cart not found");
//     }
//   } catch (error) {
//     console.error(`Error in saveProductToCart service: ${error.message}`);
//     throw error;
//   }
// };

// export const updateCart = async (idCart, newProducts) => {
//   try {
//     if (!Array.isArray(newProducts)) {
//       throw new Error("Invalid products array");
//     }
//     newProducts.forEach((product) => {
//       if (
//         !product.product ||
//         !Types.ObjectId.isValid(product.product) ||
//         !Number.isInteger(product.quantity) ||
//         product.quantity <= 0
//       ) {
//         throw new Error("Invalid product format");
//       }
//     });
//     const updatedCart = await cartDao.updateCart(idCart, newProducts);
//     return updatedCart;
//   } catch (error) {
//     console.error(`Error in updateCart service: ${error.message}`);
//     throw error;
//   }
// };

// export const updateProductQuantity = async (idCart, idProd, quantity) => {
//   try {
//     const cartExists = await cartDao.getCartById(idCart);
//     const productExists = await service.getProductById(idProd);
//     if (cartExists) {
//       if (productExists) {
//         return await cartDao.updateProductQuantity(idCart, idProd, quantity);
//       } else {
//         console.log("Product not found");
//       }
//     } else {
//       console.log("Cart not found");
//     }
//   } catch (error) {
//     console.error(`Error in updateProductQuantity service: ${error.message}`);
//     throw error;
//   }
// };

// export const deleteProductsFromCart = async (idCart) => {
//   try {
//     const cartExists = await cartDao.getCartById(idCart);
//     if (cartExists) {
//       return await cartDao.deleteProductsFromCart(idCart);
//     } else {
//       console.log("Cart not found");
//     }
//   } catch (error) {
//     console.error(`Error in deleteProductsFromCart service: ${error.message}`);
//     throw error;
//   }
// };

// export const deleteProductFromCart = async (idCart, idProd) => {
//   try {
//     const cartExists = await cartDao.getCartById(idCart);
//     const productExists = await service.getProductById(idProd);
//     if (cartExists) {
//       if (productExists) {
//         return await cartDao.deleteProductFromCart(idCart, idProd);
//       } else {
//         console.log("Product not found");
//       }
//     } else {
//       console.log("Cart not found");
//     }
//   } catch (error) {
//     console.error(`Error in deleteProductFromCart service: ${error.message}`);
//     throw error;
//   }
// };
