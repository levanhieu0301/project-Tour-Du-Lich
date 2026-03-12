module.exports.tourList = (req, res) => {
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour"
  })
}

module.exports.tourDetail = (req, res) => {
  res.render("client/pages/tour-detail", {
    pageTitle: "Chi tiết tour"
  })
}