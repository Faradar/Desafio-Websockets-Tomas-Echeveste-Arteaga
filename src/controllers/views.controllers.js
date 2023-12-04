import * as service from "../services/views.services.js";

// export const home = async (req, res, next) => {
//   try {
//     const products = await service.getAllProducts();
//     res.render("home", { style: "product.css", products });
//   } catch (error) {
//     next(error);
//   }
// };

export const realTimeProducts = (req, res) => {
  res.render("realTimeProducts", { style: "product.css" });
};

export const chat = (req, res) => {
  res.render("chat", { style: "chat.css" });
};

export const products = async (req, res, next) => {
  try {
    let { page, limit, sort, query } = req.query;
    const products = await service.getProducts(page, limit, sort, query);
    const categories = await service.getCategories();

    const response = {
      status: "success",
      user: req.session.user,
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/products?page=${products.prevPage}` +
          (limit ? `&limit=${limit}` : "") +
          (sort ? `&sort=${sort}` : "") +
          (query ? `&query=${query}` : "")
        : null,
      nextLink: products.hasNextPage
        ? `/products?page=${products.nextPage}` +
          (limit ? `&limit=${limit}` : "") +
          (sort ? `&sort=${sort}` : "") +
          (query ? `&query=${query}` : "")
        : null,
      categories,
    };
    res.render("products", { style: "product.css", ...response });
  } catch (error) {
    next(error);
  }
};

export const productDetails = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.getProductById(pid);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.render("productDetails", { style: "product.css", product });
    }
  } catch (error) {
    next(error);
  }
};

export const cartDetails = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getCartById(cid);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.render("cart", { style: "product.css", cart });
    }
  } catch (error) {
    next(error);
  }
};

export const register = (req, res) => {
  res.render("register", { style: "product.css" });
};

export const login = (req, res) => {
  res.render("login", { style: "product.css" });
};

export const profile = (req, res) => {
  res.render("profile", { style: "product.css", user: req.session.user });
};

export const registerError = (req, res) => {
  res.render("register-error", { style: "product.css" });
};

export const loginError = (req, res) => {
  res.render("login-error", { style: "product.css" });
};
