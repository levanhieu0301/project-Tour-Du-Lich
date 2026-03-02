const express = require('express')
const path = require('path')
const app = express()
const port = 3000


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