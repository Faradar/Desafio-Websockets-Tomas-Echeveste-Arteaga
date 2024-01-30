import Services from "./class.services.js";
import { chatDao } from "../persistence/factory.js";

export default class ChatService extends Services {
  constructor() {
    super(chatDao);
  }
}
