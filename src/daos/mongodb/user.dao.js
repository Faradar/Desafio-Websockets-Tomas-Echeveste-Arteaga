import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {
  async register(user) {
    try {
      const { email, password } = user;
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        return await UserModel.create({ ...user, role: "admin" });
      }
      const exists = await UserModel.findOne({ email });
      if (!exists) return await UserModel.create(user);
      else return false;
    } catch (error) {
      console.error(`Error registering ${user} user: ${error.message}`);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email, password });
      if (!userExist) return false;
      else return userExist;
    } catch (error) {
      console.error(
        `Error logging in the ${email} and ${password} credentials: ${error.message}`
      );
      throw error;
    }
  }
}
