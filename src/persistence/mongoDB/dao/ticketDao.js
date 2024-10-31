import mongoDao from "./basicDao.js";
import { ticketModelMongo } from "../models/ticketModel.js";

class TicketAccessMongo extends mongoDao {
  constructor() {
    super(ticketModelMongo);
  }
}

export default TicketAccessMongo;
