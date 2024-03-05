import app from "../app";
import request from "supertest";
import { generateMockProduct, generateMockCart } from "../utils/faker";
import config from "../config/config";
import { ProductModel } from "../persistence/daos/mongodb/product/product.model";
import { CartModel } from "../persistence/daos/mongodb/cart/cart.model";

describe("Tests for Products, Carts and Users Endpoints", () => {
  let loginResponse;

  beforeAll(async () => {
    // Login
    const adminCredentials = {
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASSWORD,
    };

    loginResponse = await request(app)
      .post("/api/sessions/login")
      .send(adminCredentials);

    // Ensure that the login was successful and a session cookie is set
    expect(loginResponse.status).toBe(302);
    expect(loginResponse.headers["set-cookie"]).toBeDefined();
  });

  // Products
  describe("DELETE /:id", () => {
    it("should delete a product by its ID", async () => {
      // Create a sample product document in the database
      const sampleProduct = await ProductModel.create(generateMockProduct());
      const productId = sampleProduct._id;

      // Make a DELETE request to delete the product by its ID
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set("Cookie", loginResponse.headers["set-cookie"]); // Set the session cookie from login response;

      checkResponse(response, 200, "Item deleted", productId);
    });
  });

  // Carts
  describe("GET /:cid", () => {
    it("should return a cart by its ID", async () => {
      // Create a sample cart document in the database
      const sampleCart = await CartModel.create(generateMockCart());
      const cartId = sampleCart._id;

      // Make a GET request to fetch the cart by its ID
      const response = await request(app).get(`/api/carts/${cartId}`);

      checkResponse(response, 200, "Success", cartId);

      // Delete the created cart
      await CartModel.findByIdAndDelete(cartId);
      const deletedCart = await CartModel.findById(cartId);
      expect(deletedCart).toBeNull();
    });
  });

  // Users
  describe("GET /current", () => {
    it("should return current user information for admin", async () => {
      const response = await request(app)
        .get("/api/sessions/current")
        .set("Cookie", loginResponse.headers["set-cookie"]); // Set the session cookie from login response;

      checkResponse(response, 200, "Success");
      expect(response.body.data.role).toBe("admin");
    });
  });

  afterAll(async () => {
    // Logout
    await request(app).post("/api/sessions/logout").expect(302);
  });
});

function checkResponse(response, statusCode, message, itemId = null) {
  expect(response.status).toBe(statusCode);
  expect(response.body).toHaveProperty("status", statusCode);
  expect(response.body).toHaveProperty("message", message);
  expect(response.body).toHaveProperty("data");
  if (itemId) {
    expect(response.body.data._id).toBe(itemId.toString());
  }
}
