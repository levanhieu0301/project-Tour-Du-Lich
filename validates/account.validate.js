const Joi = require('joi');

module.exports.registerPostValidate = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .min(5)
      .max(50)
      .required()
      .messages({
        "string.empty" :"Vui lòng nhập họ và tên!",
        "string.min": "Họ và tên phải có ít nhất 5 ký tự!",
        "string.max": "Họ và tên không được vượt quá 50 ký tự!"
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.empty": "Vui lòng nhập email!",
        "string.email": "Vui long nhập email hợp lệ!"
      }),
    password: Joi.string()
      .required()
      .min(8)
      .custom((value, helpers) => {
        if(!/[A-Z]/.test(value)) {
          return helpers.error("password.uppercase")
        }
        if (!/[a-z]/.test(value)) {
          return helpers.error("password.lowercase"); // Ít nhất một chữ cái thường
        }
        if (!/\d/.test(value)) {
          return helpers.error("password.number"); // Ít nhất một chữ số
        }
        if (!/[@$!%*?&]/.test(value)) {
          return helpers.error("password.special"); // Ít nhất một ký tự đặc biệt
        }
        return value; // Nếu tất cả điều kiện đều đúng
      })
      .messages({
        "string.empty": "Vui lòng nhập mật khẩu!",
        "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự!",
        "password.uppercase": "Mật khẩu phải chứ ít nhất một chữ cái in hoa!",
        "password.lowercase": "Mật khẩu phải chứa ít nhất một chữ cái thường!",
        "password.number": "Mật khẩu phải chứa ít nhất một chữ số!",
        "password.special": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!",
      })
  })
  const { error } = schema.validate(req.body);

  if(error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage
    });
    return;
  }
  
  next();
 
}
module.exports.loginPostValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.empty": "Vui lòng nhập email!",
        "string.email": "Vui long nhập email hợp lệ!"
      }),
    password: Joi.string()
      .required()
      .min(8)
      .custom((value, helpers) => {
        if(!/[A-Z]/.test(value)) {
          return helpers.error("password.uppercase")
        }
        if (!/[a-z]/.test(value)) {
          return helpers.error("password.lowercase"); // Ít nhất một chữ cái thường
        }
        if (!/\d/.test(value)) {
          return helpers.error("password.number"); // Ít nhất một chữ số
        }
        if (!/[@$!%*?&]/.test(value)) {
          return helpers.error("password.special"); // Ít nhất một ký tự đặc biệt
        }
        return value; // Nếu tất cả điều kiện đều đúng
      })
      .messages({
        "string.empty": "Vui lòng nhập mật khẩu!",
        "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự!",
        "password.uppercase": "Mật khẩu phải chứ ít nhất một chữ cái in hoa!",
        "password.lowercase": "Mật khẩu phải chứa ít nhất một chữ cái thường!",
        "password.number": "Mật khẩu phải chứa ít nhất một chữ số!",
        "password.special": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!",
      }),
    rememberPassword: Joi.boolean()
  })
  const { error } = schema.validate(req.body);

  if(error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage
    });
    return;
  }
  
  next();
 
}
module.exports.forgotPasswordPostValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.empty": "Vui lòng nhập email!",
        "string.email": "Vui long nhập email hợp lệ!"
      }),
  })
  const { error } = schema.validate(req.body);

  if(error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage
    });
    return;
  }
  
  next();
 
}