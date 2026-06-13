const moment = require("moment");
const Order = require("../../models/order.model");
const Tour = require("../../models/tour.model");
const City = require("../../models/cities.model")

module.exports.list =async  (req, res) => {
    const find = {
        deleted: false
    }

  const orderList = await Order
    .find(find)
    .sort({
      createdAt: "desc"
    })
    for(const order of orderList){
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
    

    res.render('admin/pages/oder-list', {
        pageTitle: 'Quản lý đơn hàng',
        orderList: orderList
    });
}
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const orderDetail = await Order.findOne({
      _id: id
    })

    orderDetail.createdAtFormat = moment(orderDetail.createdAt).format("YYYY-MM-DDTHH:mm");

    for (const item of orderDetail.items) {
      const tourInfo = await Tour.findOne({
        _id: item.tourId
      })

      if(tourInfo) {
        item.avatar = tourInfo.avatar;
        item.name = tourInfo.name;
        item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");

        const city = await City.findOne({
          _id: item.locationFrom
        })
        item.locationFromName = city.name;
      }
    }
  
    res.render("admin/pages/order-edit", {
      pageTitle: `Đơn hàng: ${orderDetail.code}`,
      orderDetail: orderDetail
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/order/list`);

  }
}
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Order.updateOne({
      _id: id
    }, req.body);

    res.json({
      code: "success"
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/order/list`);
  }
}