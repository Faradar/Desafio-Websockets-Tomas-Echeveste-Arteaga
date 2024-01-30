import { prodDao } from "../factory.js";
import ProductResDTO from "../dtos/product.res.dto.js";

export default class ProductRepository {
  constructor() {
    this.dao = prodDao;
  }

  async getDtoProductById(id) {
    try {
      const prod = await this.dao.getById(id);
      return new ProductResDTO(prod);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
