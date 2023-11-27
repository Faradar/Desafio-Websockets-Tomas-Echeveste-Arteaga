import * as service from "./product.services.js";
import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

// import CartDaoFS from "../daos/filesystem/cart.dao.js";
// import { __dirname } from "../utils.js";
// const cartDao = new CartDaoFS(
//   __dirname + "/daos/filesystem/data/carts.json"
// );

export const getCarts = async () => {
  try {
    return await cartDao.getCarts();
  } catch (error) {
    console.error(`Error in getCarts service: ${error.message}`);
    throw error;
  }
};

export const getCartById = async (id) => {
  try {
    const cart = await cartDao.getCartById(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.error(`Error in getCartById service: ${error.message}`);
    throw error;
  }
};

export const createCart = async (obj) => {
  try {
    const newCart = await cartDao.createCart(obj);
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.error(`Error in createCart service: ${error.message}`);
    throw error;
  }
};

export const saveProductToCart = async (idCart, idProd) => {
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
};

// export const updateCartProducts = async (idCart, newProducts) => {
//   try {
//     // Ensure the newProducts array is valid according to your schema
//     // ...

//     const updatedCart = await cartDao.updateCartProducts(idCart, newProducts);
//     return updatedCart;
//   } catch (error) {
//     console.error(`Error in updateCartProducts service: ${error.message}`);
//     throw error;
//   }
// };

export const updateProductQuantity = async (idCart, idProd, quantity) => {
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
};

export const deleteProductsFromCart = async (idCart) => {
  try {
    const cartExists = await cartDao.getCartById(idCart);
    if (cartExists) {
      return await cartDao.deleteProductsFromCart(idCart);
    } else {
      console.log("Cart not found");
    }
  } catch (error) {
    console.error(`Error in deleteProductsFromCart service: ${error.message}`);
    throw error;
  }
};

export const deleteProductFromCart = async (idCart, idProd) => {
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
};
