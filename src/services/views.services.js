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
    console.error(`Error in views getAllProducts service: ${error.message}`);
    throw error;
  }
};

export const getProducts = async (page, limit, sort, query) => {
  try {
    return await service.getProducts(page, limit, sort, query);
  } catch (error) {
    console.error(`Error in views getProducts service: ${error.message}`);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    return await service.getProductById(id);
  } catch (error) {
    console.error(`Error in views getProductById service: ${error.message}`);
    throw error;
  }
};
