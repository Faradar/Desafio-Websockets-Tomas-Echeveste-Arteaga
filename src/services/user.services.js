import Services from "./class.services.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createHash, isValidPass } from "../utils/bcrypt.js";
import { userDao } from "../persistence/factory.js";
import { UserModel } from "../persistence/daos/mongodb/user/user.model.js";
import { CartModel } from "../persistence/daos/mongodb/cart/cart.model.js";
import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();
import EmailService from "./email.services.js";
const emailService = new EmailService();

export default class UserService extends Services {
  constructor() {
    super(userDao);
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
      const registeredUser = await userDao.register(user);
      if (!registeredUser) {
        return { success: false, message: "User already exists" };
      }
      return { success: true, user: registeredUser };
    } catch (error) {
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  }

  async getDtoUserById(id) {
    try {
      const user = await userRepository.getDtoUserById(id);
      if (!user) return false;
      else return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getDtoUsers() {
    try {
      const users = await userRepository.getDtoUsers();
      if (!users) return false;
      else return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async resetPass(email) {
    try {
      const user = await userDao.resetPass(email);
      if (user) {
        const token = this.generateToken(user, "1h");
        return await emailService.resetPassMail(user, "resetPass", token);
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
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
      if (error.name === "TokenExpiredError") {
        return "TokenExpired";
      } else {
        throw new Error(error.message);
      }
    }
  }

  togglePremium = async (id) => {
    try {
      const response = await userDao.togglePremium(id);
      if (!response) return false;
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  async deleteInactive() {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const inactiveUsers = await UserModel.find({
        last_connection: { $lt: twoDaysAgo },
      });

      // This code can replace the code above for testing 5 minute inactive users
      // const oneMinuteAgo = new Date();
      // oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

      // const inactiveUsers = await UserModel.find({
      //   last_connection: { $lt: oneMinuteAgo },
      // });
      if (!inactiveUsers) return false;
      for (const user of inactiveUsers) {
        const msg = `
        <h1>Dear ${user.first_name},</h1>
        <p>Your account has been deleted due to inactivity. If you wish to reactivate your account, please contact support.</p>
        `;
        await emailService.sendGmail(
          user.email,
          "Account Deletion Due to Inactivity",
          msg
        );
        await CartModel.findByIdAndDelete(user.cart); // Deletes the cart referenced by the user
        await UserModel.findByIdAndDelete(user._id);
      }
      return inactiveUsers;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.getById(id);
      if (!user) return false;
      const msg = `
      <h1>Dear ${user.first_name},</h1>
      <p>Your account has been deleted. If you wish to reactivate your account, please contact support.</p>
      `;
      await emailService.sendGmail(user.email, "Account Deletion", msg);
      await CartModel.findByIdAndDelete(user.cart); // Deletes the cart referenced by the user
      await UserModel.findByIdAndDelete(user._id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
