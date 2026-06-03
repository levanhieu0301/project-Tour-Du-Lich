const Contact = require("../../models/contact.model");

module.exports.createPost = async (req, res) => {
  const { email } = req.body;

  const existEmail = await Contact.findOne({
    email: email,
    deleted: false
  });

  if(existEmail) {
    res.json({
      code: "error",
      message: "Email của bạn đã được đăng ký!"
    })
    return;
  }

  const newRecord = new Contact(req.body);
  await newRecord.save();


  res.json({
    code: "success",
    message: "Gửi liên hệ thành công!"
  });
}