import * as service from "./product.services.js";

// import ProductDaoFS from "../daos/filesystem/product.dao.js";
// import { __dirname } from "../utils.js";
// const prodDao = new ProductDaoFS(
//   __dirname + "/daos/filesystem/data/products.json"
// );

export const getAllProducts = async () => {
  try {
    return await service.getAllProducts();
  } catch (error) {
    console.log(error);
  }
};
