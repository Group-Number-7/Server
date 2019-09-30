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
  }
});

var Enemy = mongoose.model('Enemy', EnemySchema);

module.exports=Enemy;