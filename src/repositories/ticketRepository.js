export default class ticketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async () => await this.dao.getAll();

  create = async (cart) => await this.dao.create(cart);

  getById = async (id) => await this.dao.getById(id);

  update = async (id, cart) => await this.dao.update(id, cart);

  delete = async (id) => await this.dao.delete(id);
}
