import { createTransport } from "nodemailer";
import config from "../config/config.js";

export default class EmailService {
  constructor() {
    this.transporter = createTransport({
      host: config.NODEMAILER_HOST,
      port: config.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: config.NODEMAILER_EMAIL,
        pass: config.NODEMAILER_PASSWORD,
      },
    });
  }

  async sendGmail(dest, subj, msg) {
    try {
      const gmailOptions = {
        from: config.NODEMAILER_EMAIL,
        to: dest,
        subject: subj,
        html: msg,
      };

      const response = await this.transporter.sendMail(gmailOptions);
      return response;
    } catch (error) {
      throw new Error("Error in sendGmail service");
    }
  }

  generateProductsHtml(products, title) {
    if (products.length) {
      return products
        .map(
          (product) => `
        <li>Product ID: ${product.productId} - Product Name: ${product.title} - Quantity: ${product.quantity} - Price: $${product.price}</li>
      `
        )
        .join("");
    } else {
      return `<li>No ${title}</li>`;
    }
  }

  async checkoutMail(dest, name, ticketDetails) {
    try {
      const purchasedProductsHtml = this.generateProductsHtml(
        ticketDetails.purchasedProducts,
        "Purchased Products"
      );
      const unprocessedProductsHtml = this.generateProductsHtml(
        ticketDetails.unprocessedProducts,
        "Unprocessed Products"
      );
      const html = `
        <h1>Thank you for your purchase ${name}!</h1>
        <h2>Here are the details of your transaction:</h2>
        <p><strong>Transaction Code:</strong> ${ticketDetails.code}</p>
        <p><strong>Purchase Date:</strong> ${ticketDetails.purchase_datetime}</p>
        <p><strong>Amount:</strong> ${ticketDetails.amount}</p>
        <p><strong>Purchaser's Email:</strong> ${ticketDetails.purchaser}</p>
        <p><strong>Purchased Products:</strong></p>
        <ul>
          ${purchasedProductsHtml}
        </ul>
        <p><strong>Unprocessed Products:</strong></p>
        <ul>
          ${unprocessedProductsHtml}
        </ul>
      `;

      const response = await this.sendGmail(
        dest,
        `Your Order Receipt and Ticket Details ${name}`,
        html
      );
      return response;
    } catch (error) {
      throw new Error("Error in checkoutMail service");
    }
  }

  createMsgResetPass(name) {
    return `<p>Hello ${name}</p>
      <p>You are receiving this email because you want to reset your password. To do so, please click the link below. If you received this by mistake then please ignore.</p>
      <p> Click <a href='http://localhost:8080/resetPassword'>HERE</a> to reset your password.</p>
      <p>Have a wonderful day!</p>`;
    // nueva contraseña: ________  |_RESTABLECER CONTRASEÑA_| ---> POST http://localhost:8080/reset-pass
  }

  createMsgRegister(first_name) {
    `<h1>Hola ${first_name}, ¡Bienvenido/a a Coderhouse!</h1>`;
  }

  async resetPassMail(user, service, token = null) {
    try {
      const { first_name, email } = user;

      let msg = "";

      service === "register"
        ? (msg = this.createMsgRegister(first_name))
        : service === "resetPass"
        ? (msg = this.createMsgResetPass(first_name))
        : (msg = "");

      let subj = "";

      subj =
        service === "register"
          ? "Welcome"
          : service === "resetPass"
          ? "Forgotten Password"
          : "";

      const response = await this.sendGmail(email, subj, msg);
      if (token !== null) return token;
    } catch (error) {
      throw new Error("Error in resetPassMail service");
    }
  }
}
