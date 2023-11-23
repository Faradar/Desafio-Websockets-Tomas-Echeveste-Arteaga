const socket = io("/product");

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("updateProducts", (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `<div class="product">
      <h3>${product.title}</h3>
      <p>Description: ${product.description}</p>
      <p>Code: ${product.code}</p>
      <p>Price: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <p>Category: ${product.category}</p>
      <p>Thumbnails: ${product.thumbnails}</p>
    </div>
    `
    )
    .join("");
});

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = productForm.elements.title.value;
  const description = productForm.elements.description.value;
  const code = productForm.elements.code.value;
  const price = productForm.elements.price.value;
  const stock = productForm.elements.stock.value;
  const category = productForm.elements.category.value;
  const thumbnails = productForm.elements.thumbnails.value.split(",");
  const product = {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  };
  socket.emit("addProduct", product);
  productForm.reset();
});

socket.on("productCreationFailed", (message) => {
  console.error("Product creation failed: " + message);
  const errorContainer = document.getElementById("error-container");
  errorContainer.textContent = message;
  errorContainer.style.display = "block";
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});
