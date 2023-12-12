import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import SessionDaoMongoDB from "../daos/mongodb/session.dao.js";
const userDao = new SessionDaoMongoDB();

const strategyOptions = {
  clientID: "Iv1.7821b147cd0d8c57",
  clientSecret: "2edfd5d9fe584a9b4597cec97f3d9d5acc15b54c",
  callbackURL: "http://localhost:8080/api/sessions/github-callback",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;
  const user = await userDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.register({
    first_name: profile._json.name,
    email,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
