export default class UserResDTO {
  constructor(user) {
    this.id = user._id;
    this.full_name = user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.first_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.last_connection = user.last_connection;
  }
}
