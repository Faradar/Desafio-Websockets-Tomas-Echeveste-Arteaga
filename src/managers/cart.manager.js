import fs from "fs";

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const cartsJSON = await fs.promises.readFile(this.path, "utf-8");
        const cartsJS = JSON.parse(cartsJSON);
        return cartsJS;
      } else return [];
    } catch (error) {
      console.error("Error al consultar el carrito: ", error);
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const carts = await this.getCarts();
    carts.map((cart) => {
      if (cart.id > maxId) {
        maxId = cart.id;
      }
    });
    return maxId;
  }

  async createCart() {
    try {
      const cart = {
        id: (await this.#getMaxId()) + 1,
        products: [],
      };
      const cartsFile = await this.getCarts();

      cartsFile.push(cart);

      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      console.log("Carrito creado exitosamente");
      return cart;
    } catch (error) {
      console.error("Error al crear el carrito: ", error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id);
      if (!cart) return false;
      return cart;
    } catch (error) {
      console.error("Error al buscar el usuario: ", error);
    }
  }

  async saveProductToCart(idCart, idProd) {
    try {
      const carts = await this.getCarts();
      const cartExists = await this.getCartById(idCart);

      if (cartExists) {
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
        console.log("Carrito no encontrado");
      }
    } catch (error) {
      console.error("Error al guardar el producto al carrito: ", error);
    }
  }
}
