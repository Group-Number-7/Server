var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  type: {
      type: String,
      required: true
  },
  rating: {
      type: String,
      required: true
  },
  level: {
      type: Number,
      default: 1
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
  calcStats: {
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
      type: String,
      required: false
  },
  image: {
      type: String,
      required: true
  }
});

EquipmentSchema.pre('save', function (next) {
    const ratings = {
        "godly": 2,
        "legendary": 1.5,
        "rare": 1.25,
        "common": 1
    };
    this.calcStats = {
        hp: this.stats["hp"]*ratings[this.rating] + (this.statStep["hp"] * this.level),
        def:this.stats["def"]*ratings[this.rating] + (this.statStep["def"] * this.level),
        res:this.stats["res"]*ratings[this.rating] + (this.statStep["res"] * this.level),
        attack:this.stats["attack"]*ratings[this.rating] + (this.statStep["attack"] * this.level),
        magic:this.stats["magic"]*ratings[this.rating] + (this.statStep["magic"] * this.level),
        mana:this.stats["mana"]*ratings[this.rating] + (this.statStep["mana"] * this.level)
    }
    next()
})

var Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports=Equipment;   