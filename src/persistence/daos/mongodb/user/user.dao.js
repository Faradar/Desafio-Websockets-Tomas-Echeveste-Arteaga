import Daos from "../class.dao.js";
import { UserModel } from "./user.model.js";
import { CartModel } from "../cart/cart.model.js";
import { createHash, isValidPass } from "../../../../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";

export default class UserDaoMongoDB extends Daos {
  constructor() {
    super(UserModel);
  }

  /**
   * Generate user token
   * @param {*} user
   * @param {*} timeExp
   * @returns token
   */
  generateToken(user, timeExp) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, config.SECRET_JWT, {
      expiresIn: timeExp,
    });
    return token;
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
      throw new Error("Error in register dao");
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
      throw new Error("Error in login dao");
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
      throw new Error("Error in getByEmail dao");
    }
  }

  async resetPass(email) {
    try {
      const userExist = await this.getByEmail(email);
      if (userExist) {
        const token = this.generateToken(userExist, "1h");
        return { token, user: userExist };
      } else return false;
    } catch (error) {
      throw new Error("Error in resetPass dao");
    }
  }

  async updatePass(pass, token) {
    try {
      const decodedToken = jwt.verify(token, config.SECRET_JWT);
      const user = await this.getById(decodedToken.userId);
      const isEqual = isValidPass(pass, user);
      if (isEqual) return false;
      const newPass = createHash(pass);
      return await this.update(user._id, { password: newPass });
    } catch (error) {
      throw new Error("Error in updatePass dao");
    }
  }
}
