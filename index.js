const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()
const port = 3000
const clientRouter = require("./routes/client/index.route")
const adminRouter = require("./routes/admin/index.route")
const database = require("./config/client/database.config")
const variableConfig = require("./config/client/variable")
database.connectDB()
// Tích hợp pug 
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'pug')

// Nhúng file tĩnh
app.use(express.static(path.join(__dirname, 'public')))
// Cho phép gửi lên dạng json
app.use(express.json())
// Biến toàn cục 
app.locals.pathAdmin =  variableConfig.pathAdmin
app.use('/', clientRouter)
app.use(`/${variableConfig.pathAdmin}`, adminRouter)

app.listen(port, () => {
  console.log(`Đang chạy trên cổng ${port}`)
})
