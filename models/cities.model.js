const mongoose  = require("mongoose")


const Schema = new mongoose.Schema({
  name: String
})

const City = mongoose.model("City", Schema, "cities")

module.exports = City;