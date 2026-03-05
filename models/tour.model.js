const mongoose = require('mongoose');

const Tour = mongoose.model('Tour', { 
  name: String 
});
 

module.exports = Tour;