document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-premium");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const userId = event.target.getAttribute("data-id");
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `/api/sessions/premium/${userId}`, true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          const role = document.querySelector(
            `tr[data-id="${userId}"] .role-cell`
          );
          const currentRole = role.textContent;
          role.textContent = currentRole === "premium" ? "user" : "premium";
        } else {
          alert("An error occurred");
        }
      };
      xhr.send();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-user");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const userId = event.target.getAttribute("data-id");
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `/api/sessions/deleteUser/${userId}`, true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          const row = document.querySelector(`tr[data-id="${userId}"]`);
          row.parentNode.removeChild(row);
        } else {
          alert("An error occurred");
        }
      };
      xhr.send();
    });
  });
});
