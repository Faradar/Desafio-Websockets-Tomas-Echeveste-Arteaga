import { UserModel } from "./models/user.model.js";
import { createHash, isValidPass } from "../../utils.js";

export default class SessionDaoMongoDB {
  async register(user) {
    try {
      const { email } = user;
      const exists = await UserModel.findOne({ email });
      if (!exists)
        return await UserModel.create({
          ...user,
          password: createHash(user.password),
        });
      else return false;
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
}
