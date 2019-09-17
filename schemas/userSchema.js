var mongoose = require('mongoose');
var Item = require('./itemSchema');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new Schema({
  userId: {
    type: ObjectId,
  },
  username: {
      type: String,
      require: true
  },
  password: {
      type:String,
      required:true
  },
  dateCreated:{
      type: Date,
      required: true
  },
  items: {
    type: [Item],
    required: false
  }
});

var User = mongoose.model('User', UserSchema);

module.exports=User;