var mongoose = require('mongoose');

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
  equipment: {
    type: [
      {
        equipmentId: ObjectId,
        level: Number,
        quantity: Number
      }
    ],
    required: false
  },
  items: {
    type: [
      {
        itemId: ObjectId,
        level: Number,
        quantity: Number
      }
    ]
  }
});

var User = mongoose.model('User', UserSchema);

module.exports=User;