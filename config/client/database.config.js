const mongoose = require('mongoose');


 module.exports.connectDB = async ()=> {
  try {
       await mongoose.connect(process.env.DATABASE);
      console.log("Kết nối DB thành công")
  } catch (error) {
      console.error("Lỗi kết nối DB:", error);  
  }
}
