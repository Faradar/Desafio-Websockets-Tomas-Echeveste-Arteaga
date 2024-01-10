import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userDao } from "../factory/factory.js";
import config from "../config/config.js";

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

// Register
const register = async (req, email, password, done) => {
  try {
    const user = await userDao.getByEmail(email);
    if (user) return done(null, false);
    const newUser = await userDao.register(req.body);
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

// Login
const login = async (req, email, password, done) => {
  try {
    if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
      const adminUser = {
        role: "admin",
      };
      return done(null, adminUser);
    }
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
  if (user.role === "admin") {
    done(null, "admin");
  } else {
    done(null, user._id);
  }
});

// Deserialize
passport.deserializeUser(async (id, done) => {
  if (id === "admin") {
    const adminUser = {
      email: config.ADMIN_EMAIL,
      role: "admin",
      first_name: "admin",
      last_name: "admin",
      age: 0,
      _id: "admin",
    };
    return done(null, adminUser);
  }
  const user = await userDao.getById(id);
  return done(null, user);
});
