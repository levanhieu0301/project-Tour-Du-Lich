const mongoose  = require("mongoose")


const Schema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  status: String,
})

const AccountAdmin = mongoose.model("AccountAdmin", Schema, "accounts-admin")

module.exports = AccountAdmin;