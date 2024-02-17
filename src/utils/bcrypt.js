import { hashSync, genSaltSync, compareSync } from "bcrypt";

// register

/**
 * function that performs password encryption through bcryptjs with the hashSync method.
 * Receives unencrypted password,
 * returns encrypted password
 * @param password type string
 * @returns encrypted/hashed password
 */
export const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

// login

/**
 *
 * @param {*} password user-provided password, unhashed
 * @param {*} user existing user in database
 * @returns boolean
 */

export const isValidPass = (password, user) => {
  return compareSync(password, user.password);
};
