import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll();
      return httpResponse.Ok(res, items);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        return httpResponse.NotFound(res, item, errorsDictionary.ITEM_404);
      else return httpResponse.Ok(res, item);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body);
      if (!newItem)
        return httpResponse.BadRequest(res, newItem, "Error creating item");
      else return httpResponse.Created(res, newItem);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        return httpResponse.NotFound(res, item, errorsDictionary.ITEM_404);
      else {
        const itemUpd = await this.service.update(id, req.body);
        if (!itemUpd)
          return httpResponse.BadRequest(res, itemUpd, "Error updating item");
        else return httpResponse.Ok(res, itemUpd, "Item updated");
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        return httpResponse.NotFound(res, item, errorsDictionary.ITEM_404);
      else {
        const itemUpd = await this.service.delete(id);
        if (!itemUpd)
          return httpResponse.BadRequest(res, itemUpd, "Error deleting item");
        else return httpResponse.Ok(res, itemUpd, "Item deleted");
      }
    } catch (error) {
      next(error);
    }
  };
}
