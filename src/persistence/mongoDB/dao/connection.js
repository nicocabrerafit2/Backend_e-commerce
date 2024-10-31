import mongoose from "mongoose";
export default class mongoConennect {
  static #instance;
  constructor() {
    this.connectionDB();
  }
  async connectionDB() {
    try {
      await mongoose
        .connect(process.env.MONGO_STRING, { dbName: process.env.DB })
        .then(console.log("Base de datos conectada ", process.env.DB));
    } catch (e) {
      console.log("Error al conectarse a la base de datos");
    }
  }
  static getInstance() {
    if (this.#instance) {
      return this.#instance; //"Devolviendo instancia ya creada"
    } else {
      this.#instance = new mongoConennect();
      return this.#instance; //"Devolviendo instancia nueva"
    }
  }
}
