import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

// import ProductDaoFS from "../daos/filesystem/product.dao.js";
// import { __dirname } from "../utils.js";
// const prodDao = new ProductDaoFS(
//   __dirname + "/daos/filesystem/data/products.json"
// );

export const getProducts = async (page, limit, sort, query) => {
  try {
    return await prodDao.getProducts(page, limit, sort, query);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const prod = await prodDao.getProductById(id);
    if (!prod) return false;
    else return prod;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (obj) => {
  try {
    // if (
    //   !obj.title ||
    //   !obj.description ||
    //   !obj.price ||
    //   !obj.thumbnails ||
    //   !obj.code ||
    //   !obj.stock
    // ) {
    //   throw new Error("Missing fields");
    // }
    const newProd = await prodDao.createProduct(obj);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, obj) => {
  try {
    const prodUpd = await prodDao.updateProduct(id, obj);
    if (!prodUpd) return false;
    else return prodUpd;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const prodDel = await prodDao.deleteProduct(id);
    if (!prodDel) return false;
    else return prodDel;
  } catch (error) {
    console.log(error);
  }
};
