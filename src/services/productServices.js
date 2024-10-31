import { ProductRepository } from "../repositories/index.js";
import basicServices from "./basicServices.js";
import { productDTOReq } from "../persistence/DTO/productDTO.js";
import validationError from "../middlewares/ValidationError.js";

class ProductService extends basicServices {
  constructor() {
    super(ProductRepository);
  }
  async create(product) {
    const productData = new productDTOReq(product);
    const { title, description, code, price, stock, category } = productData;
    if (title && description && code && price && stock && category) {
      if (typeof title !== "string") {
        throw new validationError(
          "El campo title debe ser un texto (string)",
          422
        );
      }
      if (typeof description !== "string") {
        throw new validationError(
          "El campo description debe ser un texto (string)",
          422
        );
      }
      if (typeof code !== "string") {
        throw new validationError(
          "El campo code debe ser un texto (string)",
          422
        );
      }
      if (typeof price !== "number") {
        throw new validationError(
          "El campo price debe ser un número (Number)",
          422
        );
      }
      if (typeof stock !== "number") {
        throw new validationError(
          "El campo stock debe ser un número (Number)",
          422
        );
      }
      if (typeof category !== "string") {
        throw new validationError(
          "El campo category debe ser un texto (string)",
          422
        );
      }
      if (productData.thumbnails) {
        if (!Array.isArray(productData.thumbnails)) {
          throw new validationError(
            "El campo thumbnails debe ser un arreglo de strings (array)",
            422
          );
        }
      }
      return await super.create(productData);
    } else {
      throw new validationError("Todos los campos deben estar completos.", 400);
    }
  }
  async update(id, product) {
    const productData = new productDTOReq(product);
    const { title, description, code, price, stock, category } = productData;
    if (title && description && code && price && stock && category) {
      if (typeof title !== "string") {
        throw new validationError(
          "El campo title debe ser un texto (string)",
          422
        );
      }
      if (typeof description !== "string") {
        throw new validationError(
          "El campo description debe ser un texto (string)",
          422
        );
      }
      if (typeof code !== "string") {
        throw new validationError(
          "El campo code debe ser un texto (string)",
          422
        );
      }
      if (typeof price !== "number") {
        throw new validationError(
          "El campo price debe ser un número (Number)",
          422
        );
      }
      if (typeof stock !== "number") {
        throw new validationError(
          "El campo stock debe ser un número (Number)",
          422
        );
      }
      if (typeof category !== "string") {
        throw new Error("El campo category debe ser un texto (string)", 422);
      }
      if (productData.thumbnails) {
        if (!Array.isArray(productData.thumbnails)) {
          throw new validationError(
            "El campo thumbnails debe ser un arreglo de strings (array)",
            422
          );
        }
      }
      return await super.update(id, productData);
    } else {
      throw new validationError("Todos los campos deben estar completos.", 400);
    }
  }
}

export default ProductService;
