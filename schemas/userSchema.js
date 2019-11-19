var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  userId: {
    type: ObjectId,
  },
  email: {
    type: String,
    required: true
  },
  username: {
      type: String,
      require: true
  },
  dateCreated:{
      type: Date,
      required: true,
      default: new Date()
  },
  equipment: {
    type: [{type: ObjectId, ref: 'Equipment'}],
    required: false,
  },
  items: {
    type: [
      {
        itemId: ObjectId,
        quantity: Number
      }
    ],
    required: false,
  },
  level: {
    type: Number,
    default: 1,
    required: true
  },
  experience: {
    type: Number,
    default: 0,
    required: true
  },
  stats: {
    type: {
        hp: Number,
        def: Number,
        mana: Number,
        magic: Number,
        res: Number,
        attack: Number
    },
    default: {
        hp: 100,
        def: 10,
        mana: 100,
        magic: 10,
        res: 10,
        attack: 10
    }
  },
});

var User = mongoose.model('User', UserSchema);

module.exports=User;