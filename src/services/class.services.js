export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error("Error in getAll service");
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      throw new Error("Error in getById service");
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      if (!newItem) return false;
      else return newItem;
    } catch (error) {
      throw new Error("Error in create service");
    }
  };

  update = async (id, obj) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return await this.dao.update(id, obj);
    } catch (error) {
      throw new Error("Error in update service");
    }
  };

  delete = async (id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      throw new Error("Error in delete service");
    }
  };
}
