import jwt from "jsonwebtoken";

export function handlePolicies(policies) {
  return (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    const reqJWT = req.headers.authorization;
    // si me da un jwt es porque se logueo o almenos estuvo loqueado

    if (!reqJWT) {
      return res.status(400).send({
        status: "error",
        message: "Necesita loguearse para continuar",
      });
    }
    let userPayload = null;
    try {
      userPayload = jwt.verify(reqJWT, process.env.SECRET);
    } catch (e) {
      return res.status(400).send({ status: "error", message: e });
    }
    if (!userPayload)
      return res
        .status(400)
        .send({ status: "error", message: "error en el token" });
    if (!policies.includes(userPayload.data.rol.toUpperCase()))
      return res
        .status(403)
        .send({ status: "error", message: "no estas autorizado" });
    req.user = userPayload.data;
    next();
  };
}
