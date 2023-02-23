const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'authModel'
  },
  config:{
    styleOne: {
      isActive:{
        type: Boolean,
        default: true,
      },
      showPage:{
        type: String,
        default: 'index'
      },
      targetBlank: {
        type: Boolean,
        default: true,
      },
      image:{
        data: Buffer,
        contentType: String
      },
      alt: String,
      link: String,
    }
  }
})

module.exports = mongoose.model('dataModel', dataSchema);