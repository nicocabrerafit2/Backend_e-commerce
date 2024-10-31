export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => await this.dao.getAll();

  create = async (user) => {
    return await this.dao.create(user);
  };

  getById = async (id) => await this.dao.getById(id);

  getByEmail = async (email) => await this.dao.getByEmail(email);

  update = async (id, user) => {
    return await this.dao.update(id, user);
  };

  delete = async (id) => await this.dao.delete(id);
}
