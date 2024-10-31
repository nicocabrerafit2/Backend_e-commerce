export default class productRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => await this.dao.getAll();

  create = async (product) => await this.dao.create(product);

  getById = async (id) => await this.dao.getById(id);

  update = async (id, product) => await this.dao.update(id, product);

  delete = async (id) => await this.dao.delete(id);
}
