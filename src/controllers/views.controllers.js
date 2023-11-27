import * as service from "../services/views.services.js";

export const home = async (req, res, next) => {
  try {
    const products = await service.getAllProducts();
    res.render("home", { style: "product.css", products });
  } catch (error) {
    next(error);
  }
};

export const realTimeProducts = (req, res) => {
  res.render("realTimeProducts", { style: "product.css" });
};

export const chat = (req, res) => {
  res.render("chat", { style: "chat.css" });
};

export const products = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const products = await service.getProductsViews(page, limit);
    const response = {
      products: products.docs,
      prevLink: products.hasPrevPage
        ? `/products?page=${products.prevPage}` +
          (limit ? `&limit=${limit}` : "")
        : null,
      nextLink: products.hasNextPage
        ? `/products?page=${products.nextPage}` +
          (limit ? `&limit=${limit}` : "")
        : null,
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

    console.log("product is: ", product);
    res.render("productDetails", { style: "product.css", product });
  } catch (error) {
    next(error);
  }
};
