import config from "../config/config.js";
import EmailService from "../services/email.services.js";
const service = new EmailService();

export default class EmailController {
  async sendGmail({ dest, name, ticketDetails }) {
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
      const gmailOptions = {
        from: config.NODEMAILER_EMAIL,
        to: dest,
        subject: `Your Order Receipt and Ticket Details ${name}`,
        html,
      };
      const response = await service.transporter.sendMail(gmailOptions);
      return response;
    } catch (error) {
      throw error;
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
}
