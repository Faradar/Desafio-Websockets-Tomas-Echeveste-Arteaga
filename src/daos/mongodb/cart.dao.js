import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  async getCarts() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      console.error(`Error fetching carts: ${error.message}`);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const response = await CartModel.findById(id)
        .populate("products.product")
        .lean();
      return response;
    } catch (error) {
      console.error(`Error fetching cart with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.error(`Error creating cart with obj ${obj}: ${error.message}`);
      throw error;
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
      console.log("Cart exists = ", response);
      return response;
    } catch (error) {
      console.error(
        `Error saving the ${idProd} product to the ${idCart} cart: ${error.message}`
      );
      throw error;
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
      console.error(
        `Error updating the products in the ${idCart} cart: ${error.message}`
      );
      throw error;
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
      console.error(
        `Error updating the ${idProd} product quantity in the ${idCart} cart: ${error.message}`
      );
      throw error;
    }
  }

  async deleteProductsFromCart(idCart) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        idCart,
        { $set: { products: [] } },
        { new: true }
      );
      console.log("Products deleted from the cart =", updatedCart);
      return updatedCart;
    } catch (error) {
      console.error(
        `Error deleting the products from the ${idCart} cart: ${error.message}`
      );
      throw error;
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
      console.log("Product deleted from the cart =", updatedProducts);
      return response;
    } catch (error) {
      console.error(
        `Error deleting the ${idProd} product from the ${idCart} cart: ${error.message}`
      );
      throw error;
    }
  }
}
