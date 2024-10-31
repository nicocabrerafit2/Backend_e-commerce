import { TicketRepository } from "../repositories/index.js";
import basicServices from "./basicServices.js";

class TicketService extends basicServices {
  constructor() {
    super(TicketRepository);
  }
}

export default TicketService;
