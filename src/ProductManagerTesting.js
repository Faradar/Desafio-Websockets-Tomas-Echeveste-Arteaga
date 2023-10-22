const ProductManager = require("./ProductManager");

// Testing
const test = async () => {
  try {
    // Create an instance of the ProductManager class
    const manager = new ProductManager();

    // Call the newly created getProducts method, it should return an empty array
    let products = await manager.getProducts();
    console.log("Test 1 - Get Products: ", products);

    // Call the addProduct method with the specified fields
    await manager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    });

    // The object should be successfully added with an automatically generated non-repeating id
    products = await manager.getProducts();
    console.log("Test 2 - Get Products after adding: ", products);

    // Call the getProductById method and verify that it returns the product with the specified id
    const productId = products[0].id;
    const productById = await manager.getProductById(productId);
    console.log("Test 3 - Get Product by Id: ", productById);

    // Call the updateProduct method and try to change a field of a product
    await manager.updateProduct(productId, { price: 420 });

    // Verify that the id is not deleted and the update has been made
    products = await manager.getProducts();
    console.log("Test 4 - Get Products after updating: ", products);

    // Call the deleteProduct method and verify that the product is deleted or throws an error if it doesn't exist
    await manager.deleteProduct(productId);

    products = await manager.getProducts();
    console.log("Test 5 - Get Products after deleting: ", products);

    console.log("Testing finished successfully!");
  } catch (error) {
    console.error("Testing error: ", error);
  }
};

test();
