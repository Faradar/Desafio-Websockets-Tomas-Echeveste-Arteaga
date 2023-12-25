import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
const service = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(service);
  }

  async getProducts(req, res, next) {
    try {
      const { page, limit, sort, query } = req.query;
      const products = await service.getProducts(page, limit, sort, query);
      const response = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `/api/products?page=${products.prevPage}` +
            (limit ? `&limit=${limit}` : "") +
            (sort ? `&sort=${sort}` : "") +
            (query ? `&query=${query}` : "")
          : null,
        nextLink: products.hasNextPage
          ? `/api/products?page=${products.nextPage}` +
            (limit ? `&limit=${limit}` : "") +
            (sort ? `&sort=${sort}` : "") +
            (query ? `&query=${query}` : "")
          : null,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { pid } = req.params;
      const product = await service.getProductById(pid);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  }
}

// export const getProducts = async (req, res, next) => {
//   try {
//     const { page, limit, sort, query } = req.query;
//     const products = await service.getProducts(page, limit, sort, query);
//     const response = {
//       status: "success",
//       payload: products.docs,
//       totalPages: products.totalPages,
//       prevPage: products.prevPage,
//       nextPage: products.nextPage,
//       page: products.page,
//       hasPrevPage: products.hasPrevPage,
//       hasNextPage: products.hasNextPage,
//       prevLink: products.hasPrevPage
//         ? `/api/products?page=${products.prevPage}` +
//           (limit ? `&limit=${limit}` : "") +
//           (sort ? `&sort=${sort}` : "") +
//           (query ? `&query=${query}` : "")
//         : null,
//       nextLink: products.hasNextPage
//         ? `/api/products?page=${products.nextPage}` +
//           (limit ? `&limit=${limit}` : "") +
//           (sort ? `&sort=${sort}` : "") +
//           (query ? `&query=${query}` : "")
//         : null,
//     };
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getProductById = async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const product = await service.getProductById(pid);
//     if (!product) {
//       res.status(404).json({ message: "Product not found" });
//     } else {
//       res.status(200).json(product);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const createProduct = async (req, res, next) => {
//   try {
//     const newProd = await service.createProduct(req.body);
//     if (!newProd) {
//       res.status(400).json({ message: "Product could not be created" });
//     } else {
//       res.status(201).json(newProd);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateProduct = async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const prodUpd = await service.updateProduct(pid, req.body);
//     if (!prodUpd) {
//       res.status(404).json({ message: "Product not found" });
//     } else {
//       res.status(200).json(prodUpd);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteProduct = async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const prodDel = await service.deleteProduct(pid);
//     if (!prodDel) {
//       res.status(404).json({ message: "Product not found" });
//     } else {
//       res.status(204).json({ message: `Product id: ${pid} deleted` });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
