var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  levelRequirement: {
      type: Number,
      required: false
  },
  effect: {
      type: String
  },
  image: {
      type: String,
      required: true
  }
});

var Item = mongoose.model('Items', ItemSchema);

module.exports=Item;   