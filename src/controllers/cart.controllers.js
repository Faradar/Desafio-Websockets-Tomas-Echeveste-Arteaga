import { errorsDictionary } from "../utils/http.response.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
const service = new CartService();
import EmailController from "./email.controllers.js";
const emailController = new EmailController();

export default class CartController extends Controllers {
  constructor() {
    super(service);
  }

  async getCarts(req, res, next) {
    try {
      const { limit } = req.query;
      const carts = await service.getAll();
      if (limit) {
        const limitedCarts = carts.slice(0, Number(limit));
        return httpResponse.Ok(res, limitedCarts);
      } else return httpResponse.Ok(res, carts);
    } catch (error) {
      next(error);
    }
  }

  async getCartById(req, res, next) {
    try {
      const { cid } = req.params;
      const cart = await service.getCartById(cid);
      if (!cart)
        return httpResponse.NotFound(res, cart, errorsDictionary.CART_404);
      else return httpResponse.Ok(res, cart);
    } catch (error) {
      next(error);
    }
  }

  async saveProductToCart(req, res, next) {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await service.saveProductToCart(cid, pid);
      const userSession = req.session.user;
      if (!updatedCart)
        return httpResponse.BadRequest(
          res,
          updatedCart,
          "Cart could not be updated"
        );
      else res.status(200).redirect(`/carts/${userSession.cart}`);
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req, res, next) {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const updatedCart = await service.updateCart(cid, products);
      return httpResponse.Ok(res, updatedCart, "Cart updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateProductQuantity(req, res, next) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      // Validate if quantity is a positive integer
      if (!Number.isInteger(quantity) || quantity <= 0) {
        return httpResponse.BadRequest(res, quantity, "Invalid quantity value");
      }
      const updatedCart = await service.updateProductQuantity(
        cid,
        pid,
        quantity
      );
      return httpResponse.Ok(
        res,
        updatedCart,
        "Product quantity updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteProductsFromCart(req, res, next) {
    try {
      const { cid } = req.params;
      const updatedCart = await service.deleteProductsFromCart(cid);
      return httpResponse.NoContent(
        res,
        updatedCart,
        "Products deleted from cart successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteProductFromCart(req, res, next) {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await service.deleteProductFromCart(cid, pid);
      if (!updatedCart) {
        return httpResponse.BadRequest(
          res,
          updatedCart,
          "Product could not be deleted"
        );
      } else {
        return httpResponse.NoContent(
          res,
          updatedCart,
          "Product deleted from cart successfully"
        );
      }
    } catch (error) {
      next(error);
    }
  }

  async generateTicket(req, res, next) {
    try {
      const { _id } = req.session.user;
      const { cid } = req.params;
      const { ticket, purchasedProducts, unprocessedProducts } =
        await service.generateTicket(_id, cid);
      if (!ticket) {
        return httpResponse.BadRequest(
          res,
          ticket,
          "Ticket could not be generated"
        );
      } else {
        const serializedpurchasedProducts = JSON.stringify(purchasedProducts);
        const serializedUnprocessedProducts =
          JSON.stringify(unprocessedProducts);

        if (purchasedProducts.length > 0) {
          const emailOptions = {
            dest: req.session.user.email,
            name: req.session.user.first_name,
            ticketDetails: {
              code: ticket.code,
              purchase_datetime: ticket.purchase_datetime,
              amount: ticket.amount,
              purchaser: ticket.purchaser,
              purchasedProducts,
              unprocessedProducts,
            },
          };
          await emailController.sendGmail(emailOptions);
        }

        res
          .status(201)
          .redirect(
            `/checkout?code=${ticket.code}&datetime=${
              ticket.purchase_datetime
            }&amount=${ticket.amount}&purchaser=${
              ticket.purchaser
            }&purchasedProducts=${encodeURIComponent(
              serializedpurchasedProducts
            )}&unprocessedProducts=${encodeURIComponent(
              serializedUnprocessedProducts
            )}`
          );
      }
    } catch (error) {
      next(error);
    }
  }
}
