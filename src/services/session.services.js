import SessionDaoMongoDB from "../daos/mongodb/session.dao.js";
const sessionDao = new SessionDaoMongoDB();

export default class SessionService {
  async register(user) {
    try {
      const registeredUser = await sessionDao.register(user);
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
      const loggedInUser = await sessionDao.login(email, password);
      if (!loggedInUser) {
        return { success: false, message: "Invalid email or password" };
      }
      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error(`Error in loginUser: ${error.message}`);
      throw error;
    }
  }

  async getById(id) {
    try {
      const userExist = await sessionDao.getById(id);
      return userExist;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
