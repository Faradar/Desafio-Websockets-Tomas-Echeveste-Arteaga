import Services from "./class.services.js";
import { cartDao } from "../persistence/factory.js";
import { ticketDao } from "../persistence/factory.js";
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
      if (!cart) throw new Error("Cart not found");
      else return cart;
    } catch (error) {
      throw new Error("Error in getCartById service");
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
          throw new Error("Product not found");
        }
      } else {
        throw new Error("Cart not found");
      }
    } catch (error) {
      throw new Error("Error in saveProductToCart service");
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
          return httpResponse.BadRequest(
            res,
            product,
            "Invalid product or quantity value"
          );
        }
      });
      const updatedCart = await cartDao.updateCart(idCart, newProducts);
      return updatedCart;
    } catch (error) {
      throw new Error("Error in updateCart service");
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
          throw new Error("Product not found");
        }
      } else {
        throw new Error("Cart not found");
      }
    } catch (error) {
      throw new Error("Error in updateProductQuantity service");
    }
  }

  async deleteProductsFromCart(idCart) {
    try {
      const cartExists = await cartDao.getCartById(idCart);
      if (cartExists) {
        return await cartDao.deleteProductsFromCart(idCart);
      } else {
        throw new Error("Cart not found");
      }
    } catch (error) {
      throw new Error("Error in deleteProductsFromCart service");
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
          throw new Error("Product not found");
        }
      } else {
        throw new Error("Cart not found");
      }
    } catch (error) {
      throw new Error("Error in deleteProductFromCart service");
    }
  }

  async generateTicket(userId, cartId) {
    try {
      const user = await userService.getById(userId);
      if (!user) return false;
      const cart = await cartDao.getById(cartId);
      if (!cart) return false;

      let amountAcc = 0;
      const productsToUpdateStock = [];
      const unprocessedProducts = [];
      const purchasedProducts = [];

      for (const p of cart.products) {
        const idProd = p.product._id.toString();
        const prodFromDB = await productService.getProductById(idProd);

        // compare quantity in cart to DB
        if (p.quantity <= prodFromDB.stock) {
          const amount = p.quantity * prodFromDB.price;
          amountAcc += amount;

          // Update the product quantity in the database
          productsToUpdateStock.push({
            productId: idProd,
            newStock: prodFromDB.stock - p.quantity,
          });

          // Add product to purchasedProducts array
          purchasedProducts.push({
            productId: idProd,
            title: prodFromDB.title,
            quantity: p.quantity,
          });
        } else {
          // Handle the case where the purchased quantity exceeds the available stock
          // throw new Error(`Insufficient stock for product with ID ${idProd}`);

          // Add information to unprocessedProducts array
          unprocessedProducts.push({
            productId: idProd,
            title: prodFromDB.title,
            quantity: p.quantity,
          });
        }
      }

      // Check if any products couldn't be processed
      // if (unprocessedProducts.length > 0) {
      //   throw new Error(
      //     "Some products have insufficient stock. They will not be processed:",
      //     unprocessedProducts
      //   );
      // }

      //create the ticket
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

      return { ticket, purchasedProducts, unprocessedProducts };
    } catch (error) {
      throw new Error("Error in generateTicket service");
    }
  }
}
