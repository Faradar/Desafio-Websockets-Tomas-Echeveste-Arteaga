import { CartModel } from "./models/cart.model.js";
import * as service from "../../services/product.services.js";

export default class CartDaoMongoDB {
  async getCarts() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductToCart(idCart, idProd) {
    try {
      const cartExists = await this.getCartById(idCart);
      const productExists = await service.getProductById(idProd);
      if (cartExists) {
        if (productExists) {
          const existProductInCart = cartExists.products.find(
            (product) => product.product.toString() === idProd
          );
          if (existProductInCart) {
            existProductInCart.quantity += 1;
          } else {
            cartExists.products.push({
              product: idProd,
              quantity: 1,
            });
          }
          const response = await CartModel.findByIdAndUpdate(
            idCart,
            { products: cartExists.products },
            { new: true }
          );
          console.log("Cart exists = ", response);
          return response;
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
