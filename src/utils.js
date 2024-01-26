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

/* ------------------------------------ - ----------------------------------- */

import { faker } from "@faker-js/faker";

export const generateMockProduct = () => {
  return {
    status: true,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.uuid(),
    price: faker.commerce.price(),
    stock: faker.number.int({ max: 500 }),
    category: faker.commerce.department(),
    thumbnails: Array.from({ length: 3 }, () => faker.image.url()),
  };
};
