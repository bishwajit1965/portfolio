const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

class User {
  constructor() {
    this.db = getDB(); // Get the connected database instance
    this.collection = this.db.collection("users");
  }

  async createUser(userData) {
    console.log("User data before saving:", userData);
    try {
      const result = await this.collection.insertOne(userData);
      return { _id: result.insertedId, ...userData }; // Return the newly created user
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.collection.findOne({ email });
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  async findUserById(id) {
    try {
      const user = await this.collection.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  // This function is not used at present
  async getAllUsers() {
    try {
      const users = await this.collection.find({}).toArray();
      return users;
    } catch (error) {
      throw new Error("Error in finding users", error.message);
    }
  }

  // Get paginated users
  async getAllUsersPaginated(page, limit) {
    const skip = (page - 1) * limit;
    return this.collection.find({}).skip(skip).limit(parseInt(limit)).toArray(); // Assuming you're using the native MongoDB driver
  }

  // Count the total number of users
  async countUsers() {
    return this.collection.countDocuments();
  }

  async updateUserRole(id, role) {
    try {
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: role }
      );
      return result.modifiedCount > 0; // Return true if update was successful
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  // Update user role or other fields
  async setRoleForUser(id, role) {
    try {
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: role } } // Update role field
      );
      return result.modifiedCount > 0;
    } catch (error) {
      throw new Error("Error updating user role: " + error.message);
    }
  }

  async deleteUserById(id) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0; // Return true if deletion was successful
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

module.exports = User;
