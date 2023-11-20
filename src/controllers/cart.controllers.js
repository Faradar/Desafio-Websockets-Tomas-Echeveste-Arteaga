import * as service from "../services/cart.services.js";

export const getCarts = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const carts = await service.getCarts();
    if (limit) {
      const limitedCarts = carts.slice(0, Number(limit));
      res.status(200).json(limitedCarts);
    } else {
      res.status(200).json(carts);
    }
  } catch (error) {
    next(error.message);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getCartById(cid);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    next(error.message);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const newCart = await service.createCart(req.body);
    if (!newCart) {
      res.status(400).json({ message: "Cart could not be created" });
    } else {
      res.status(200).json(newCart);
    }
  } catch (error) {
    next(error.message);
  }
};

export const saveProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await service.saveProductToCart(cid, pid);
    if (!updatedCart) {
      res.status(400).json({ message: "Cart could not be updated" });
    } else {
      res.status(200).json(updatedCart);
    }
  } catch (error) {
    next(error.message);
  }
};
