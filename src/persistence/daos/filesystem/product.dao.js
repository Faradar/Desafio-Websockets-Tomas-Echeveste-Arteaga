import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsJSON = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsJSON);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Could not find the products");
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === Number(id));
      if (product) {
        return product;
      }
      return false;
    } catch (error) {
      throw new Error("Could not find the product");
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
      return product;
    } catch (error) {
      throw new Error("Could not create the product");
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new Error(`Id ${id} not found`);
      }
      const updatedProduct = {
        ...products[productIndex],
        ...updatedFields,
        id: id,
      };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      throw new Error("Could not update the product");
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new Error(`Id ${id} not found`);
      }
      products.splice(productIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      throw new Error("Could not delete the product");
    }
  }
}
