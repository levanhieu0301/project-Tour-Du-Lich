module.exports.upload = (req, res) => {
  res.json({
    location: req.file.path
  })
}