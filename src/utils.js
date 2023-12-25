import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};

/* ------------------------------------ - ----------------------------------- */

import { hashSync, genSaltSync, compareSync } from "bcrypt";

//registro
export const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

//login

/**
 *
 * @param {*} password contraseña proporcionada por el usuario, sin hashear
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */

export const isValidPass = (password, user) => {
  return compareSync(password, user.password);
};
