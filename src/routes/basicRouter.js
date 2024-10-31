import { Router } from "express";
import { handlePolicies } from "../middlewares/validationRoutes.js";

export default class BasicRouter {
  constructor() {
    this.router = Router();
    this.handlePolicies = handlePolicies;
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...cb) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(cb)
    );
  }

  post(path, policies, ...cb) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(cb)
    );
  }

  put(path, policies, ...cb) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(cb)
    );
  }
  delete(path, policies, ...cb) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(cb)
    );
  }

  applyCallbacks(cb) {
    return cb.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (e) {
        return params[1].status(500).send(e); // params[1] -> res
      }
    });
  }
}
