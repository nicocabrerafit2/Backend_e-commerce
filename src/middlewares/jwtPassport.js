import passport from "passport";
import jwt, { ExtractJwt } from "passport-jwt";
import { getJWTCookie } from "../utils/utils.js";
import { userModel } from "../persistence/factory.js";
import { userDTOReq, userDTORes } from "../persistence/DTO/userDTO.js";
const JWTStrategy = jwt.Strategy;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([getJWTCookie]),
        secretOrKey: process.env.SECRET,
      },
      async (payload, done) => {
        try {
          const userData = new userDTOReq(payload.data);
          const userFound = await userModel
            .findOne({ email: userData.email })
            //.populate("cart")
            .lean();
          if (!userFound) {
            return done(null, false);
          }

          return done(null, userFound);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
};

export default initializePassport;
