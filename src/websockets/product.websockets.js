import ProductService from "../services/product.services.js";
const service = new ProductService();

function productWebSocket(productNamespace) {
  productNamespace.on("connection", async (socket) => {
    console.log(`🟢 User ${socket.id} connected to products`);

    try {
      const products = await service.getAllProducts();
      socket.emit("updateProducts", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    socket.on("addProduct", async (productData) => {
      try {
        const newProduct = await service.createProduct(productData);
        if (newProduct) {
          const updatedProducts = await service.getAllProducts();
          productNamespace.emit("updateProducts", updatedProducts);
        } else {
          socket.emit("productCreationFailed", "Failed to create the product.");
        }
      } catch (error) {
        console.error("Error adding a new product:", error);
        socket.emit("productCreationFailed", "Failed to create the product.");
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User ${socket.id} disconnected from the products`);
    });
  });
}

export default productWebSocket;
