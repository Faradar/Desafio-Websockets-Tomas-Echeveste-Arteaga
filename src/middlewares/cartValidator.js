import { ProductModel } from "../persistence/daos/mongodb/product/product.model.js";
import { CartModel } from "../persistence/daos/mongodb/cart/cart.model.js";
import { HttpResponse } from "../utils/http.response.js";
import errorsDictionary from "../utils/errors.dictionary.js";
const httpResponse = new HttpResponse();

export const saveProductValidator = async (req, res, next) => {
  const product = await ProductModel.findById(req.params.pid);
  const { user } = req.session;
  if (!product) {
    return httpResponse.NotFound(res, product, errorsDictionary.PRODUCT_404);
  }

  if (user.role === "premium" && user.email === product.owner) {
    return httpResponse.Forbidden(res, user, "You can't buy your own product");
  } else {
    next();
  }
};

export const cartOwnershipValidator = async (req, res, next) => {
  const { user } = req.session;
  const { cid } = req.params;
  const cart = await CartModel.findById(cid);
  if (user.cart !== cart._id.toString()) {
    return httpResponse.Forbidden(res, user, "You can only edit your own cart");
  } else {
    next();
  }
};
