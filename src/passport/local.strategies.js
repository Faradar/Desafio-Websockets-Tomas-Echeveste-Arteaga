import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userDao } from "../persistence/persistence.js";

const strategyOptions = {
  usernameField: "email",
  passportField: "password",
  passReqToCallback: true,
};

// Register
const register = async (req, email, password, done) => {
  try {
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (email.match(emailRegex)) {
      const user = await userDao.getByEmail(email);
      if (user) return done(null, false);
      const newUser = await userDao.register(req.body);
      return done(null, newUser);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

// Login
const login = async (req, email, password, done) => {
  try {
    const userLogin = await userDao.login(email, password);
    if (!userLogin) return done(null, false, { msg: "User not found" });
    return done(null, userLogin);
  } catch (error) {
    console.log(error);
  }
};

// Strategies
const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

// Initialization
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

// req.session.passport.user --> id del usuario

// Serialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize
passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  return done(null, user);
});
