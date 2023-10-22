const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json";
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
      console.error("Error al consultar los productos:", error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);
      return product;
    } catch (error) {
      console.error(
        "Could not find the product under the following error: ",
        error
      );
    }
  }

  generateNonRepeatingId(existingIds) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8; // Adjust the length of the generated ID as needed
    let id = "";

    do {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
      }
    } while (existingIds.includes(id)); // Check if the generated ID already exists in the existing IDs array

    return id;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();

      // Generate a new id
      const existingIds = products.map((p) => p.id);
      const id = this.generateNonRepeatingId(existingIds);
      product.id = id;

      // Add the product to the array
      products.push(product);

      // Save the updated array to the file
      await fs.promises.writeFile(this.path, JSON.stringify(products));

      console.log("Product created succesfully");
    } catch (error) {
      console.error(
        "Could not create the product under the following error: ",
        error
      );
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.getProducts();

      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }

      // Merge the updated fields with the existing product
      const updatedProduct = { ...products[productIndex], ...updatedFields };

      // Update the product in the array
      products[productIndex] = updatedProduct;

      // Save the updated array to the file
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

      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      // Remove the product from the array
      products.splice(productIndex, 1);

      // Save the updated array to the file
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

module.exports = ProductManager;
