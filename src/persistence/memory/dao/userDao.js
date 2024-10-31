export class UserAccessMemory {
  constructor() {
    this.data = [];
  }

  async get() {
    console.log("Respondiendo desde Memory Persistence");
    return await this.data;
  }

  async getById(id) {
    console.log("Respondiendo desde Memory Persistence");
    return await this.data.find((contacto) => contacto.id === id);
  }

  async deleteById(id) {
    this.data = this.data.filter((contacto) => contacto.id !== id);
    return await this.data;
  }

  async create(contacto) {
    this.data.push(contacto);
    console.log(this.data);
    return this.data;
  }

  async update(id, contactoActualizado) {
    const index = this.data.findIndex((contacto) => contacto.id === id);
    this.data[index] = {
      ...this.data[index],
      ...contactoActualizado,
    };
    return await this.data;
  }
}
