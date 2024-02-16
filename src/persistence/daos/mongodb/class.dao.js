export default class Daos {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const response = await this.model.find({});
      return response;
    } catch (error) {
      throw new Error("Error in getAll dao");
    }
  }

  async getById(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      throw new Error("Error in getById dao");
    }
  }

  async create(obj) {
    try {
      const response = await this.model.create(obj);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Error in create dao");
    }
  }

  async update(id, obj) {
    try {
      await this.model.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      throw new Error("Error in update dao");
    }
  }

  async delete(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error("Error in delete dao");
    }
  }
}
