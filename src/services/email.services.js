import { createTransport } from "nodemailer";
import config from "../config/config.js";

export default class EmailService {
  constructor() {
    this.transporter = createTransport({
      host: config.NODEMAILER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: config.NODEMAILER_EMAIL,
        pass: config.NODEMAILER_PASSWORD,
      },
    });
  }
}
