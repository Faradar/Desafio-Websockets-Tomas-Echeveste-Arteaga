import * as service from "../services/views.services.js";

export const home = async (req, res, next) => {
  try {
    const products = await service.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const realTimeProducts = (req, res) => {
  res.render("realTimeProducts");
};
