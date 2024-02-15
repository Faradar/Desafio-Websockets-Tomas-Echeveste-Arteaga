import Services from "./class.services.js";
import { userDao } from "../persistence/factory.js";
import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();
import EmailService from "./email.services.js";
const emailService = new EmailService();

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
      throw new Error("Error in register service");
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
      throw new Error("Error in login service");
    }
  }

  async getDtoUserById(id) {
    try {
      const user = await userRepository.getDtoUserById(id);
      if (!user) return false;
      else return user;
    } catch (error) {
      throw new Error("Error in getDtoUserById service");
    }
  }

  async resetPass(email) {
    try {
      const token = await userDao.resetPass(email);
      if (token.token)
        return await emailService.resetPassMail(
          token.user,
          "resetPass",
          token.token
        );
      else return false;
    } catch (error) {
      throw new Error("Error in resetPass service");
    }
  }

  updatePass = async (pass, token) => {
    try {
      const response = await userDao.updatePass(pass, token);
      if (!response) return false;
      return response;
    } catch (error) {
      throw new Error("Error in updatePass service");
    }
  };
}
