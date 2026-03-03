const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()
const port = 3000
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

const Tuor = mongoose.model('Tour', { 
  name: String 
});


// Tích hợp pug 
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'pug')

// Nhúng file tĩnh
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Hey', 
    message: 'Hello there!' 
  })
})

app.listen(port, () => {
  console.log(`Đang chạy trên cổng ${port}`)
})
