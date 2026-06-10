const Tour = require("../../models/tour.model")
const City = require("../../models/cities.model")
const moment = require("moment")

module.exports.cart = (req, res) => {
  res.render('client/pages/cart', {
    pageTitle: "Giỏ hàng"
  })
} 

module.exports.detail = async (req, res) => {
  const cart = req.body
  for (const item of cart) {
    const findTour = await Tour.findOne({
      _id: item.tourId,
      deleted:false,
      status:"active"
    })
    if(findTour){
      item.avatar = findTour.avatar
      item.name = findTour.name
      item.slug = findTour.slug
      item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
      const locationFrom = await City.findOne({
        _id: item.locationFrom
      }) 
      item.locationFromName = locationFrom.name;
      
      item.stockAdult = findTour.stockAdult;
      item.stockChildren = findTour.stockChildren;
      item.stockBaby = findTour.stockBaby;
      
      if(item.quantityAdult > item.stockAdult) {
        item.quantityAdult = item.stockAdult;
      }

      if(item.quantityChildren > item.stockChildren) {
        item.quantityChildren = item.stockChildren;
      }

      if(item.quantityBaby > item.stockBaby) {
        item.quantityBaby = item.stockBaby;
      }
      
      item.priceNewAdult = findTour.priceNewAdult;
      item.priceNewChildren = findTour.priceNewChildren;
      item.priceNewBaby = findTour.priceNewBaby;
    }else{
      // Nếu không có thì xóa tour 
      
      const indexItem = cart.findIndex(tour => tour.tourId == item.tourId);
      cart.splice(indexItem, 1);

    }
    
  }
  res.json({
    code: "success",
    message: "Giỏ hàng chi tiết",
    cart: cart
  })
} 