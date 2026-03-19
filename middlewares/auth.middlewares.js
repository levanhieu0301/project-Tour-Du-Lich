const jwt = require("jsonwebtoken");
const AccountAdmin = require("../models/account-admin.model");
module.exports.verifyToken = async(req, res, next) => {  

try {
    const token = req.cookies.token;
  if(!token){
    res.redirect(`/${pathAdmin}/account/login`);
    return;
  }
  const decoded = jwt.verify(token, process.env.LG_SECRET);
  console.log(decoded)
  const exitsAccount = await AccountAdmin.findOne({
    _id: decoded.id,
    email: decoded.email
  })
  if(!exitsAccount) {
    res.clearCookie("token");
    res.redirect(`/${pathAdmin}/account/login`);
    return;
  }
  req.account = exitsAccount;
  next();
} catch (error) {
  res.clearCookie("token");
  res.redirect(`/${pathAdmin}/account/login`);
}
}
