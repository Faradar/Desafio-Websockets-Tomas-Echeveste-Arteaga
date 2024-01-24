// Delete button
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-product");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const productId = button.getAttribute("data-product-id");
      const cartId = button.getAttribute("cart-id");
      const listItem = button.closest("li"); // Get the closest list item containing the delete button

      try {
        const response = await fetch(
          `/api/carts/${cartId}/products/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Update the UI or reload the page as needed
          listItem.remove();
          console.log("Product deleted successfully");
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});

// Plus and minus button
document.addEventListener("DOMContentLoaded", function () {
  const quantityButtons = document.querySelectorAll(".quantity-btn");

  quantityButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const productId = button.getAttribute("data-product-id");
      const cartId = button.getAttribute("cart-id");
      const action = button.getAttribute("data-action");
      const quantityElement = button.parentElement.querySelector(".quantity");
      let newQuantity;

      try {
        // Get the current quantity from the UI
        const currentQuantity = parseInt(quantityElement.textContent);

        // Update the new quantity based on the action
        if (action === "add") {
          newQuantity = currentQuantity + 1;
        } else if (action === "subtract" && currentQuantity > 0) {
          newQuantity = currentQuantity - 1;
        } else {
          // If action is not 'add' or 'subtract', or quantity is already 0
          return;
        }

        const response = await fetch(
          `/api/carts/${cartId}/products/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: newQuantity }),
          }
        );

        if (response.ok) {
          // Update the UI with the new quantity
          quantityElement.textContent = newQuantity;

          console.log("Quantity updated successfully");
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});
