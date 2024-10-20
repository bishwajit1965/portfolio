const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

class SuperAdminModel {
  constructor() {
    this.db = getDB();
    this.collection = this.db.collection("users");
  }

  async findUserByEmail(email) {
    try {
      const user = await this.collection.findOne({ email });
      console.log("Super admin user", user);
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }
}

module.exports = SuperAdminModel;
