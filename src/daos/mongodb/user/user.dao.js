import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { CartModel } from "../cart/cart.model.js";
import { createHash, isValidPass } from "../../../utils.js";

export default class UserDaoMongoDB extends MongoDao {
  constructor() {
    super(UserModel);
  }

  async register(user) {
    try {
      const { email } = user;
      const exists = await UserModel.findOne({ email });
      if (!exists) {
        if (user.isGithub || user.isGoogle) {
          const newUser = await UserModel.create({
            ...user,
          });
          const newCart = await CartModel.create({ user: newUser._id });
          await UserModel.findByIdAndUpdate(newUser._id, { cart: newCart._id });
          return newUser;
        } else {
          const newUser = await UserModel.create({
            ...user,
            password: createHash(user.password),
          });
          const newCart = await CartModel.create({ user: newUser._id });
          await UserModel.findByIdAndUpdate(newUser._id, { cart: newCart._id });
          return newUser;
        }
      } else return false;
    } catch (error) {
      console.error(`Error registering ${user} user: ${error.message}`);
      throw error;
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
      console.error(
        `Error logging in the ${email} and ${password} credentials: ${error.message}`
      );
      throw error;
    }
  }

  // async getById(id) {
  //   try {
  //     const userExist = await UserModel.findById(id);
  //     if (userExist) {
  //       return userExist;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // }

  async getByEmail(email) {
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
