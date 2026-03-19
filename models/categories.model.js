const mongoose  = require("mongoose")


const Schema = new mongoose.Schema({
  name: String,
  parent: String,
  status: String,
  avatar: String,
  description: String,
  position: Number,
  createdBy: String,
  updatedBy: String,
  deletedBy: String,
  deletedAt: Date, 
  slug: String,
  deleted: {
    type: Boolean,
    default: false
  },
},{
  timestamps: true // Tự động thêm createdAt và updatedAt
})

const Category = mongoose.model("Category", Schema, "categories")

module.exports = Category;