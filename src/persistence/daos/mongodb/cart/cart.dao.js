import Daos from "../class.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartDaoMongoDB extends Daos {
  constructor() {
    super(CartModel);
  }

  async getCartById(id) {
    try {
      const response = await CartModel.findById(id)
        .populate("products.product")
        .lean();
      return response;
    } catch (error) {
      throw new Error("Error in getCartById dao");
    }
  }

  async saveProductToCart(idCart, idProd) {
    try {
      const cartExists = await CartModel.findById(idCart);
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
      return response;
    } catch (error) {
      throw new Error("Error in saveProductToCart dao");
    }
  }

  async updateCart(idCart, newProducts) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        idCart,
        { products: newProducts },
        { new: true }
      );

      return updatedCart;
    } catch (error) {
      throw new Error("Error in updateCart dao");
    }
  }

  async updateProductQuantity(idCart, idProd, quantity) {
    try {
      const updatedCart = await CartModel.findOneAndUpdate(
        { _id: idCart, "products.product": idProd },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new Error("Error in updateProductQuantity dao");
    }
  }

  async deleteProductsFromCart(idCart) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        idCart,
        { $set: { products: [] } },
        { new: true }
      );
      return updatedCart;
    } catch (error) {
      throw new Error("Error in deleteProductsFromCart dao");
    }
  }

  async deleteProductFromCart(idCart, idProd) {
    try {
      const cartExists = await CartModel.findById(idCart);
      const updatedProducts = cartExists.products.filter(
        (product) => product.product._id.toString() !== idProd
      );
      const response = await CartModel.findByIdAndUpdate(
        idCart,
        { products: updatedProducts },
        { new: true }
      );
      return response;
    } catch (error) {
      throw new Error("Error in deleteProductFromCart dao");
    }
  }
}
