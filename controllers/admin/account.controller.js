const AccountAdmin = require("../../models/account-admin.model")
const bcrypt = require("bcryptjs")
module.exports.login = (req, res) => {
    res.render('admin/pages/login', {
        pageTitle: 'Đăng nhập'
    });
}
module.exports.loginPost = async (req, res) => {
    const {email, password} = req.body
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
module.exports.otpPassword = (req, res) => {
    res.render('admin/pages/otp-password', {
        pageTitle: 'Xác nhận OTP'
    });
}
module.exports.resetPassword = (req, res) => {
    res.render('admin/pages/reset-password', {
        pageTitle: 'Đặt lại mật khẩu'
    });
}