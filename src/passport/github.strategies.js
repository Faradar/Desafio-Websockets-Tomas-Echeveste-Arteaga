import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDaoMongoDB from "../daos/mongodb/user/user.dao.js";
const userDao = new UserDaoMongoDB();
import "dotenv/config";

const strategyOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/api/sessions/github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;
  const user = await userDao.getByEmail(email);
  if (user) {
    if (!user.isGithub) {
      user.isGithub = true;
      await user.save();
    }
    return done(null, user);
  }
  const newUser = await userDao.register({
    first_name: profile._json.name,
    email,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});
