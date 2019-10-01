var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
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
      }
  },
  statStep: {
    type: {
        hp:Number,
        def:Number,
        res:Number,
        attack:Number,
        magic:Number,
        mana:Number
    }
  },
  levelRequirement: {
      type: Number,
      required: false
  },
  classRequirement: {
      type: Number,
      required: false
  },
  image: {
      type: String,
      required: true
  }
});

var Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports=Equipment;   