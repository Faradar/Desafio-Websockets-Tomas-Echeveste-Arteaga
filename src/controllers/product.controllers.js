import * as service from "../services/product.services.js";

export const getProducts = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const products = await service.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, Number(limit));
      res.status(200).json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    next(error.message);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.getProductById(pid);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProd = await service.createProduct(req.body);
    if (!newProd) {
      res.status(400).json({ message: "Product could not be created" });
    } else {
      res.status(201).json(newProd);
    }
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodUpd = await service.updateProduct(pid, req.body);
    if (!prodUpd) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(prodUpd);
    }
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodDel = await service.deleteProduct(pid);
    if (!prodDel) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ message: `Product id: ${pid} deleted` });
    }
  } catch (error) {
    next(error.message);
  }
};
