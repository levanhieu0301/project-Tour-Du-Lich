const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('backend 2024!')
})

app.listen(port, () => {
  console.log(`Đang chạy trên cổng ${port}`)
})