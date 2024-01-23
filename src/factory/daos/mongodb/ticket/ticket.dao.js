import Daos from "../class.dao.js";
import { TicketModel } from "./ticket.model.js";

export default class TicketDaoMongoDB extends Daos {
  constructor() {
    super(TicketModel);
  }
}
