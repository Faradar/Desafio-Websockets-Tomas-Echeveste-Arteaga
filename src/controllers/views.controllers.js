import ViewService from "../services/views.services.js";
const service = new ViewService();

export default class ViewController {
  async home(req, res, next) {
    try {
      const products = await service.getAllProducts();
      res.render("home", { style: "product.css", products });
    } catch (error) {
      next(error);
    }
  }

  realTimeProducts(req, res) {
    res.render("realTimeProducts", { style: "product.css" });
  }

  chat(req, res) {
    res.render("chat", { style: "chat.css" });
  }

  async products(req, res, next) {
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
  }

  async productDetails(req, res, next) {
    try {
      const { pid } = req.params;
      const product = await service.getProductById(pid);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        const response = {
          status: "success",
          user: req.session.user,
          product,
        };
        res.render("productDetails", { style: "product.css", ...response });
      }
    } catch (error) {
      next(error);
    }
  }

  async cartDetails(req, res, next) {
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
  }

  register(req, res) {
    res.render("register", { style: "product.css" });
  }

  login(req, res) {
    res.render("login", { style: "product.css" });
  }

  profile(req, res) {
    res.render("profile", { style: "product.css", user: req.session.user });
  }

  registerError(req, res) {
    res.render("register-error", { style: "product.css" });
  }

  loginError(req, res) {
    res.render("login-error", { style: "product.css" });
  }

  async checkout(req, res, next) {
    try {
      // Retrieve ticket details from query parameters
      const { code, datetime, amount, purchaser } = req.query;
      // Render the checkout page with the ticket details
      res.render("checkout", {
        ticket: { code, purchase_datetime: datetime, amount, purchaser },
      });
    } catch (error) {
      next(error);
    }
  }
}
