const mongoose  = require("mongoose")


const Schema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 0
  },
})

const ForgotPassword = mongoose.model("ForgotPassword", Schema, "forgot-password")

module.exports = ForgotPassword;