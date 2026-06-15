const Order = require("../../models/order.model");
const AccountAdmin = require("../../models/account-admin.model");
const moment = require("moment");

const Tour = require("../../models/tour.model");
const City = require("../../models/cities.model")
module.exports.dashboard = async (req, res) => {
    // Thông số tổng quan
  const overview = {
    totalAdmin: 0,
    totalUser: 0,
    totalOrder: 0,
    totalRevenue: 0
  }

  overview.totalAdmin = await AccountAdmin.countDocuments({
    deleted: false
  });

  // overview.totalUser = await AccountUser.countDocuments({
  //   deleted: false
  // });

  const orderList = await Order.find({
    deleted: false
  });

  overview.totalOrder = orderList.length;
  overview.totalRevenue = orderList.reduce((sum, item) => sum + item.total, 0);
  // Hết Thông số tổng quan
    const find = {
          deleted: false
    }
  
    const listOrder = await Order
      .find(find)
      .sort({
        createdAt: "desc"
      })
      for(const order of listOrder){
          for(const item of order.items){
              const infoTour = await Tour.findOne({
                  _id: item.tourId
              })
              if(infoTour){
                  item.avatar = infoTour.avatar;
                  item.name = infoTour.name;
              }
          }
      switch (order.paymentMethod) {
        case "money":
          order.paymentMethodName = "Thanh toán tiền mặt";
          break;
        case "momo":
          order.paymentMethodName = "Ví MoMo";
          break;
        case "bank":
          order.paymentMethodName = "Chuyển khoản ngân hàng";
          break;
      }
  
      switch (order.paymentStatus) {
        case "unpaid":
          order.paymentStatusName = "Chưa thanh toán";
          break;
        case "paid":
          order.paymentStatusName = "Đã thanh toán";
          break;
      }
  
      switch (order.status) {
        case "initial":
          order.statusName = "Khởi tạo";
          order.statusColor = "orange";
          break;
        case "done":
          order.statusName = "Hoàn thành";
          order.statusColor = "green";
          break;
        case "cancel":
          order.statusName = "Hủy";
          order.statusColor = "red";
          break;
      }
          order.createdAtFormatTime = moment(order.createdAt).format("HH:mm");
          order.createdAtFormatDate = moment(order.createdAt).format("DD/MM/YYYY");
      }
      

    res.render('admin/pages/dashboard', {
        pageTitle: 'Tổng quan',
        overview:overview,
        listOrder: listOrder
    });
}
module.exports.revenueChartPost = async (req, res) => {
  const { monthCurrent, yearCurrent, previousMonth, previousYear, dayArray } = req.body;
  // Lấy ra tất cả đơn hàng tháng hiện tại
   
  const ordersCurrentMonth = await Order.find({
    deleted: false,
    createdAt: {
      $gte: new Date(yearCurrent, monthCurrent - 1, 1),
      $lt: new Date(yearCurrent, monthCurrent, 1)
    }
  })
  // Lấy ra tất cả đơn hàng tháng trước
    const ordersPreviousMonth = await Order.find({
    deleted: false,
    createdAt: {
      $gte: new Date(previousYear, previousMonth - 1, 1),
      $lt: new Date(previousYear, previousMonth, 1)
    }
  })
   // Tạo mảng doanh thu theo từng ngày bằng vòng lặp for
  const dataMonthCurrent = [];
  const dataMonthPrevious = [];

  for (const day of dayArray) {
    // Tìm doanh thu của ngày day trong tháng hiện tại
    let revenueCurrent = 0;
    for (const order of ordersCurrentMonth) {
      const orderDate = new Date(order.createdAt).getDate();
      if(orderDate == day) {
        revenueCurrent += order.total;
      }
    }
    dataMonthCurrent.push(revenueCurrent);

    // Tìm doanh thu của ngày day trong tháng trước
    let revenuePrevious = 0;
    for (const order of ordersPreviousMonth) {
      const orderDate = new Date(order.createdAt).getDate();
      if(orderDate == day) {
        revenuePrevious += order.total;
      }
    }
    dataMonthPrevious.push(revenuePrevious);
  }

  res.json({
    code: "success",
    dataMonthCurrent: dataMonthCurrent,
    dataMonthPrevious: dataMonthPrevious
  })
}
