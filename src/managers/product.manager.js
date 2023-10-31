import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsJSON = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsJSON);
        return products;
      } else return [];
    } catch (error) {
      console.error(
        "Could not find the product under the following error:",
        error
      );
    }
  }

  async createProduct(obj) {
    try {
      const product = {
        id: uuidv4(),
        status: true,
        ...obj,
      };
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Product created succesfully");
      return product;
    } catch (error) {
      console.error(
        "Could not create the product under the following error: ",
        error
      );
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      return product;
    } catch (error) {
      console.error(
        "Could not find the product under the following error: ",
        error
      );
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        // throw new Error("Product not found");
        return false;
      }
      const updatedProduct = {
        ...products[productIndex],
        ...updatedFields,
        id: id,
      };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Product updated succesfully");
    } catch (error) {
      console.error(
        "Could not update the product under the following error: ",
        error
      );
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        // throw new Error("Product not found");
        return false;
      }
      products.splice(productIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Product deleted succesfully");
    } catch (error) {
      console.error(
        "Could not delete the product under the following error: ",
        error
      );
    }
  }
}
