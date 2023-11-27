import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

// import CartDaoFS from "../daos/filesystem/cart.dao.js";
// import { __dirname } from "../utils.js";
// const cartDao = new CartDaoFS(
//   __dirname + "/daos/filesystem/data/carts.json"
// );

export const getCarts = async () => {
  try {
    return await cartDao.getCarts();
  } catch (error) {
    console.log(error);
  }
};

export const getCartById = async (id) => {
  try {
    const cart = await cartDao.getCartById(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async (obj) => {
  try {
    const newCart = await cartDao.createCart(obj);
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const saveProductToCart = async (idCart, idProd) => {
  try {
    return await cartDao.saveProductToCart(idCart, idProd);
  } catch (error) {
    console.log(error);
  }
};

// export const updateCartProducts = async (idCart, newProducts) => {
//   try {
//     // Ensure the newProducts array is valid according to your schema
//     // ...

//     const updatedCart = await cartDao.updateCartProducts(idCart, newProducts);
//     return updatedCart;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateProductQuantity = async (idCart, idProd, quantity) => {
  try {
    return await cartDao.updateProductQuantity(idCart, idProd, quantity);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductsFromCart = async (idCart) => {
  try {
    return await cartDao.deleteProductsFromCart(idCart);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductFromCart = async (idCart, idProd) => {
  try {
    return await cartDao.deleteProductFromCart(idCart, idProd);
  } catch (error) {
    console.log(error);
  }
};
