import { createResponse } from "../utils/utils.js";

class basicController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.service.getAll();
      createResponse(res, 200, data);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.getById(id);
      createResponse(
        res,
        !data ? 404 : 200,
        !data ? { message: "Elemento no encontrado" } : data
      );
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.service.create(req.body);
      createResponse(res, 201, data);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.update(id, req.body);
      createResponse(res, !data ? 404 : 200, data);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);
      createResponse(
        res,
        !data ? 404 : 200,
        !data
          ? {
              message: "Elemento no encontrado, no eliminado",
            }
          : { message: "Elemento eliminado" }
      );
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };
}

export default basicController;
