import Daos from "../class.dao.js";
import { UserModel } from "./user.model.js";
import { CartModel } from "../cart/cart.model.js";
import { createHash, isValidPass } from "../../../../utils/bcrypt.js";

export default class UserDaoMongoDB extends Daos {
  constructor() {
    super(UserModel);
  }

  async register(user) {
    try {
      const { email } = user;
      const exists = await UserModel.findOne({ email });
      let newUser;
      if (!exists) {
        if (user.isGithub || user.isGoogle) {
          newUser = await UserModel.create({
            ...user,
          });
        } else {
          newUser = await UserModel.create({
            ...user,
            password: createHash(user.password),
          });
        }
        const newCart = await CartModel.create({ user: newUser._id });
        await UserModel.findByIdAndUpdate(newUser._id, { cart: newCart._id });
        return newUser;
      } else return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        const pass = isValidPass(password, userExist);
        return !pass ? false : userExist;
      } else return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async resetPass(email) {
    try {
      const userExist = await this.getByEmail(email);
      return userExist ? userExist : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async togglePremium(id) {
    try {
      const user = await this.getById(id);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.role === "admin") return false;
      user.role = user.role === "user" ? "premium" : "user";
      await this.update(id, user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
