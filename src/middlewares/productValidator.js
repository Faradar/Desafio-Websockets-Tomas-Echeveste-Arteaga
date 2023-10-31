export const productValidator = (req, res, next) => {
  const product = req.body;
  if (
    product.title === undefined ||
    typeof product.title !== "string" ||
    product.description === undefined ||
    typeof product.description !== "string" ||
    product.code === undefined ||
    typeof product.code !== "string" ||
    product.price === undefined ||
    typeof product.price !== "number" ||
    product.stock === undefined ||
    typeof product.stock !== "number" ||
    product.category === undefined ||
    typeof product.category !== "string"
  ) {
    res.status(400).json({ message: "Invalid body" });
  } else {
    next();
  }
};
