import Services from "./class.services.js";
import { userDao } from "../factory/factory.js";
import UserRepository from "../factory/repository/user.repository.js";
const userRepository = new UserRepository();

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

  async getDtoUserById(id) {
    try {
      const user = await userRepository.getDtoUserById(id);
      if (!user) return false;
      else return user;
    } catch (error) {
      console.error(`Error in getDtoUserById service: ${error.message}`);
      throw error;
    }
  }
}
