const AccountAdmin = require("../../models/account-admin.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const generateOTP = require("../../helpers/generate.helper")
const ForgotPassword = require("../../models/forgot-password.model")
const nodemailer = require("nodemailer")
const sendEmail = require("../../helpers/send-email.helper")
module.exports.login = (req, res) => {
    res.render('admin/pages/login', {
        pageTitle: 'Đăng nhập'
    });
}
module.exports.loginPost = async (req, res) => {
    const {email, password, rememberPassword} = req.body
    const existAccount = await AccountAdmin.findOne({
        email: email
    })
    if(!existAccount) {
        res.json({
            code: "error",
            message: "Email chưa đăng ký!"
        })
        return;
    }
    // kiểm tra mật khẩu
    const checkPassword = bcrypt.compareSync(password, existAccount.password);
    if(!checkPassword) {
        res.json({
            code: "error",
            message: "Mật khẩu không đúng!"
        })
        return;
    }
    // Trạng thái
    if(existAccount.status !== "active") {
        res.json({
            code: "error",
            message: "Tài khoản chưa được kích hoạt, vui lòng liên hệ quản trị viên!"
        })
        return;
    }
    // tạo token
    const token = jwt.sign({
        id: existAccount.id,
        email: existAccount.email,
     },
      process.env.LG_SECRET
    ,{ 
        expiresIn: rememberPassword ? "7d" : "1d"
     });
    // Trả token cho client
     res.cookie("token", token, {
        maxAge: rememberPassword ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 ngày hoặc 1 ngày
        httpOnly: true,
        sameSite: "strict"
     })

    res.json({
        code: "success",
        message: "Đăng nhập thành công"
    })
}
module.exports.register = (req, res) => {
    res.render('admin/pages/register', {
        pageTitle: 'Đăng ký'
    });
}
module.exports.registerPost = async (req, res) => {
    const { fullName, email, password } = req.body;

    const existAccount = await AccountAdmin.findOne({
        email: email
    })
    if(existAccount){
        res.json({
            code: "error",
            message: "Email đã tồn tại, vui lòng chọn email khác!"
        })
        return;
    }
    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    
    const newAccount = new AccountAdmin({
        fullName: fullName,
        email: email,
        password: hashPassword,
        status: "initial"
    })
    await newAccount.save();

    res.json({
        code: "success",
        message:"Đăng ký thành công"
    })
}
module.exports.forgotPassword = (req, res) => {
    res.render('admin/pages/forgot-password', {
        pageTitle: 'Quên mật khẩu'
    });
}
module.exports.forgotPasswordPost = async (req, res) => {
    const { email } = req.body;
    const existAccount = await AccountAdmin.findOne({
        email: email
    });
    if (!existAccount) {
        res.json({
            code: "error",
            message: "Email chưa đăng ký!"
        });
        return;
    }
    // Tạo mã OTP
    const otp = generateOTP.generateRandomNumber(6);
   
    // Lưu  vào csdl
    const newOTP = new ForgotPassword({
        email: email,
        otp: otp,
        expireAt:  Date.now() + 5 *60 *1000 // 5 phút
    })
    await newOTP.save();

    // Gửi email chứa mã OTP
    const subject = `Mã OTP lấy lại mật khẩu`;
    const content = `Mã OTP của bạn là ${otp} . Mã OTP có hiệu lực trong 5 phút, vui lòng không cung cấp cho bất kỳ ai.`;
    await sendEmail.sendEmail(email, subject, content);
    res.json({
        code: "success",
        message: "Gửi email thành công, vui lòng kiểm tra hộp thư của bạn!"
    })
}

module.exports.otpPassword = (req, res) => {
    res.render('admin/pages/otp-password', {
        pageTitle: 'Xác nhận OTP'
    });
}
module.exports.otpPasswordPost = async (req, res) => {
    const { email, otp } = req.body;
    const existOTP = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });
    if(!existOTP) {
        res.json({
            code: "error",
            message: "Mã OTP không đúng!"
        })
        return;
    }
    const existAccount = await AccountAdmin.findOne({
        email: email
    });
    // tạo token
    const token = jwt.sign({
        id: existAccount.id,
        email: existAccount.email,
     },
      process.env.LG_SECRET
    ,{ 
        expiresIn: "1d"
     });
    // Trả token cho client
     res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 7 ngày hoặc 1 ngày
        httpOnly: true,
        sameSite: "strict"
     })
    res.json({
        code: "success",
        message: "Xác nhận OTP thành công!"
    })
}

module.exports.resetPassword = (req, res) => {
    res.render('admin/pages/reset-password', {
        pageTitle: 'Đặt lại mật khẩu'
    });
}
module.exports.resetPasswordPost = async (req, res) => {
    const { password } = req.body;
    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await AccountAdmin.updateOne({
        _id: req.account.id
    }, {
        password: hashPassword
    })
    res.clearCookie("token");
    res.json({
        code: "success",
        message: "Đặt lại mật khẩu thành công!"
    })
}     
module.exports.logoutPost = (req, res) => {
    res.clearCookie("token");
    res.json({
        code: "success",
        message: "Đăng xuất thành công"
    })
}
// 