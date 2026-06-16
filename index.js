const express = require('express')
const path = require('path')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')
const clientRouter = require("./routes/client/index.route")
const adminRouter = require("./routes/admin/index.route")
const database = require("./config/client/database.config")
const variableConfig = require("./config/client/variable")

const app = express()
const port = process.env.PORT || 3000;
database.connectDB() // kết nối database
// Tích hợp pug 
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'pug')

// Nhúng file tĩnh
app.use(express.static(path.join(__dirname, 'public')))
// Cho phép gửi lên dạng json
app.use(express.json())
app.use(cookieParser("HHHHHHH"))
// Hiển thị thông báo khi thành công
app.use(session({
  secret: 'HHHHHHH',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 
  }}));
app.use(flash());
// Biến toàn cục dùng trong file pug
app.locals.pathAdmin =  variableConfig.pathAdmin
// Tạo biến dùng trong file js backend
global.pathAdmin = variableConfig.pathAdmin;

app.use('/', clientRouter)
app.use(`/${variableConfig.pathAdmin}`, adminRouter)

app.listen(port, () => {
  console.log(`Đang chạy trên cổng ${port}`)
})
