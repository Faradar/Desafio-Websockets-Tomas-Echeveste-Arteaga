import Services from "./class.services.js";
import { chatDao } from "../factory/factory.js";

export default class ChatService extends Services {
  constructor() {
    super(chatDao);
  }
}
