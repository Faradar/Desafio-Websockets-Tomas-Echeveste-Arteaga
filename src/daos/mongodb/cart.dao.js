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
      const response = await CartModel.findById(id).populate(
        "products.product"
      );
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
      const cartExists = await CartModel.findById(idCart);
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
      console.error(
        `Error saving the ${idProd} product to the ${idCart} cart: ${error}`
      );
    }
  }

  // async updateCartProducts(idCart, newProducts) {
  //   try {
  //     const newProducts2 = [newProducts];

  //     const updatedCart = await CartModel.findByIdAndUpdate(
  //       idCart,
  //       { products: newProducts2 },
  //       { new: true }
  //     );

  //     return updatedCart;
  //   } catch (error) {
  //     console.error(
  //       `Error updating the products in the ${idCart} cart: ${error}`
  //     );
  //   }
  // }

  async updateProductQuantity(idCart, idProd, quantity) {
    try {
      const cartExists = await CartModel.findById(idCart);
      const productExists = await service.getProductById(idProd);
      if (cartExists) {
        if (productExists) {
          const updatedCart = await CartModel.findOneAndUpdate(
            { _id: idCart, "products.product": idProd },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
          );

          return updatedCart;
        } else {
          console.log("Product not found");
        }
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error(
        `Error updating the ${idProd} product quantity in the ${idCart} cart: ${error}`
      );
    }
  }

  async deleteProductsFromCart(idCart) {
    try {
      const cartExists = await CartModel.findById(idCart);
      if (cartExists) {
        const updatedCart = await CartModel.findByIdAndUpdate(
          idCart,
          { $set: { products: [] } },
          { new: true }
        );
        console.log("Products deleted from the cart =", updatedCart);
        return updatedCart;
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error(
        `Error deleting the products from the ${idCart} cart: ${error}`
      );
    }
  }

  async deleteProductFromCart(idCart, idProd) {
    try {
      const cartExists = await CartModel.findById(idCart);
      const productExists = await service.getProductById(idProd);
      if (cartExists) {
        if (productExists) {
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
        } else {
          console.log("Product not found");
        }
      } else {
        console.log("Cart not found");
      }
    } catch (error) {
      console.error(
        `Error deleting the ${idProd} product from the ${idCart} cart: ${error}`
      );
    }
  }
}
