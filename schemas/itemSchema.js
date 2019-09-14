var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ItemSchema = new Schema({
  name: {
      type: String,
      require: true
  },
  stats:{
      type: {
          hp:Number,
          def:Number,
          res:Number,
          attack:Number,
          magic:Number,
          mana:Number
      },
      required: true
  }
});

var Item = mongoose.model('User', ItemSchema);

module.exports=Item;