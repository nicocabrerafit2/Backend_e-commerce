import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { getJWTCookie } from "../utils/utils.js";
import { userDTOReq } from "../persistence/DTO/userDTO.js";
import { userModel } from "../persistence/factory.js";

export const configPassport = () => {
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
            .lean();
          if (!userFound) {
            return done(null, false);
          }

          return done(null, userFound);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
