import UserDaoMongoDB from "../daos/mongodb/user.dao.js";
const userDao = new UserDaoMongoDB();

export default class UserService {
  async register(user) {
    try {
      // Perform any additional business logic related to user registration

      // For example, you might want to validate the user data before registration

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
      // Perform any additional business logic related to user login

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
}
