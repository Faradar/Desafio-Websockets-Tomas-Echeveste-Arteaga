import { userDao } from "../factory.js";
import UserResDTO from "../dtos/user.res.dto.js";

export default class UserRepository {
  constructor() {
    this.dao = userDao;
  }

  async getDtoUsers() {
    try {
      const users = await this.dao.getAll();
      return users.map((user) => new UserResDTO(user));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getDtoUserById(id) {
    try {
      const user = await this.dao.getById(id);
      return new UserResDTO(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
