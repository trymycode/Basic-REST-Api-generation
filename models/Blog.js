// importing mongoose module
const mongoose = require('mongoose');
// import schema
const Schema = mongoose.Schema;
const timeLib = require('./../libs/timeLib');
let blogSchema = new Schema({
  blogId: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  bodyHtml: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  tags: [],
  created: {
    type: String,
    time: timeLib.getLocalTime()
}, 
lastModified: {
  type: String,
  time: timeLib.getLocalTime()
}

})



mongoose.model('Blog', blogSchema);