import Services from "./class.services.js";
import { cartDao } from "../factory/factory.js";
import { ticketDao } from "../factory/factory.js";
import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import ProductService from "./product.services.js";
const productService = new ProductService();
import UserService from "./user.services.js";
const userService = new UserService();

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
      const productExists = await productService.getProductById(idProd);
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
      const productExists = await productService.getProductById(idProd);
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
      const productExists = await productService.getProductById(idProd);
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

  async generateTicket(userId, cartId) {
    try {
      //buscar el usuario
      const user = await userService.getById(userId);
      if (!user) return false;

      //buscar el carrito
      const cart = await cartDao.getById(cartId);
      if (!cart) return false;

      let amountAcc = 0;
      const productsToUpdateStock = [];
      const productsNotProcessed = [];

      for (const p of cart.products) {
        const idProd = p.product._id.toString();
        const prodFromDB = await productService.getProductById(idProd);

        //verifico si la cantidad que tengo en el carrito supera al stock del producto en db
        if (p.quantity <= prodFromDB.stock) {
          const amount = p.quantity * prodFromDB.price;
          amountAcc += amount;

          // Update the product quantity in the database
          productsToUpdateStock.push({
            productId: idProd,
            newStock: prodFromDB.stock - p.quantity,
          });

          // const newStock = prodFromDB.stock - p.quantity;
          // await productService.updateProductStock(idProd, newStock);
        } else {
          // Handle the case where the purchased quantity exceeds the available stock
          console.log(`Insufficient stock for product with ID ${idProd}`);
          productsNotProcessed.push(idProd);
        }
      }

      // Check if any products couldn't be processed
      if (productsNotProcessed.length > 0) {
        console.log(
          "Some products have insufficient stock. They will not be processed:",
          productsNotProcessed
        );
      }

      //crear el ticket
      const ticket = await ticketDao.create({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });

      // Update the stock for products with enough stock
      for (const { productId, newStock } of productsToUpdateStock) {
        await productService.updateProductStock(productId, newStock);
      }

      // Filter out products that were purchased and update the cart
      const remainingProducts = cart.products.filter(
        (p) =>
          !productsToUpdateStock.find(
            (upd) => upd.productId === p.product._id.toString()
          )
      );
      cart.products = remainingProducts;
      await cart.save();

      //vaciar el carrito
      // cart.products = [];
      // cart.save();

      //retornar el ticket
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
