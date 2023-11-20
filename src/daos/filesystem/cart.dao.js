import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import ProductDaoFS from "./product.dao.js";
const prodDao = new ProductDaoFS();

export default class CartDaoFS {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsJSON = await fs.promises.readFile(this.path, "utf-8");
        const cartsJS = JSON.parse(cartsJSON);
        return cartsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error when querying the cart: ", error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id);
      if (!cart) {
        return false;
      }
      return cart;
    } catch (error) {
      console.error("Error when searching for the user: ", error);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const cartsFile = await this.getCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      console.log("Cart created successfully");
      return cart;
    } catch (error) {
      console.error("Error creating the cart: ", error);
    }
  }

  async saveProductToCart(idCart, idProd) {
    try {
      const carts = await this.getCarts();
      const cartExists = await this.getCartById(idCart);
      const productExists = await prodDao.getProductById(idProd);

      if (cartExists) {
        if (productExists) {
          const existProductInCart = cartExists.products.find(
            (product) => product.product === idProd
          );
          if (existProductInCart) {
            existProductInCart.quantity += 1;
          } else {
            const prod = {
              product: idProd,
              quantity: 1,
            };
            cartExists.products.push(prod);
          }
          const index = carts.findIndex((cart) => cart.id === idCart);
          if (index !== -1) {
            carts[index] = cartExists;
          }
          await fs.promises.writeFile(this.path, JSON.stringify(carts));
          console.log("cart exists = ", cartExists);
          console.log("carts = ", carts);
          return cartExists;
        } else {
          console.log("Product not found");
        }
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error("Error saving the product to the cart: ", error);
    }
  }
}
