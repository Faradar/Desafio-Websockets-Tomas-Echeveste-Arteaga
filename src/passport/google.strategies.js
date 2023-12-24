import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import SessionDaoMongoDB from "../daos/mongodb/session.dao.js";
const userDao = new SessionDaoMongoDB();
import "dotenv/config";

const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/sessions/oauth2/redirect/accounts.google.com",
  scope: ["profile", "email"],
  state: true,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;
  const user = await userDao.getByEmail(email);
  if (user) {
    if (!user.isGoogle) {
      user.isGoogle = true;
      await user.save();
    }
    return done(null, user);
  }
  const newUser = await userDao.register({
    first_name: profile._json.given_name,
    last_name: profile._json.family_name,
    email,
    // image: profile._json.picture,
    isGoogle: true,
  });
  return done(null, newUser);
};

passport.use("google", new GoogleStrategy(strategyOptions, registerOrLogin));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});
