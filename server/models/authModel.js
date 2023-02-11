const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  access_token:{
    type: String,
    require: [true, "Missing accessToken"]
  },
  expires_in:{
    type: String,
    require: [true, "Missing expires"]
  },
  orgid:{
    type: String,
    require: [true, "Missing orgid"]
  },
})

module.exports = mongoose.model('authModel', authSchema);