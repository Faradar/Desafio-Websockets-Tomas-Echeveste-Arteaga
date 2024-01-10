import Services from "./class.services.js";
import { userDao } from "../factory/factory.js";

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  async register(user) {
    try {
      const registeredUser = await userDao.register(user);
      if (!registeredUser) {
        return { success: false, message: "User already exists" };
      }
      return { success: true, user: registeredUser };
    } catch (error) {
      console.error(`Error in registerUser: ${error.message}`);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const loggedInUser = await userDao.login(email, password);
      if (!loggedInUser) {
        return { success: false, message: "Invalid email or password" };
      }
      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error(`Error in loginUser: ${error.message}`);
      throw error;
    }
  }

  // async getById(id) {
  //   try {
  //     const userExist = await userDao.getById(id);
  //     return userExist;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // }
}
