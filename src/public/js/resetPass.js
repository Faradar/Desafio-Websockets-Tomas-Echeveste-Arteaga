document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const newPassword = formData.get("password");

    try {
      const response = await fetch("/api/sessions/newPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        displayErrorMessage(JSON.stringify(errorData)); // Display JSON data
        throw new Error("Server error");
      }

      // Reset password successful, redirect to success page
      window.location.href = "/resetPassword/success";
    } catch (error) {
      console.error("Error resetting password:", error.message);
      // Handle any other errors, e.g., network errors
    }
  });

function displayErrorMessage(data) {
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = data;
  errorMessageElement.style.display = "block";
}
