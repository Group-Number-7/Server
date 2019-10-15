var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var EnemySchema = new Schema({
  name: {
      type: String,
      require: true
  },
  stats:{
    type: {
        hp:Number,
        def:Number,
        res: Number,
        attack:Number,
        magic:Number
    },
      required: true
  }, 
  location: {
      type: {
          latitude: Number,
          longitude: Number
      },
      required: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {expires: "1m"},
  },
});

EnemySchema.index({createdAt: 1},{expires: "10s"});

var Enemy = mongoose.model('Enemy', EnemySchema);

module.exports=Enemy;