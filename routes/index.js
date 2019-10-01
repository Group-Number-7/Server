var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const Equipment = require('../schemas/equipmentSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});
router.get('/new_item', function(req, res, next) {
  res.render('views/main.ejs', { title: 'Express' });
});

router.post('/new_item', [
  check('item_name').not().isEmpty(),
  check('hp').not().isEmpty(),
  check('mana').not().isEmpty(),
  check('attack').not().isEmpty(),
  check('defense').not().isEmpty(),
  check('resistance').not().isEmpty(),
  check('magic').not().isEmpty(),
  check('hp_step').not().isEmpty(),
  check('mana_step').not().isEmpty(),
  check('attack_step').not().isEmpty(),
  check('defense_step').not().isEmpty(),
  check('resistance_step').not().isEmpty(),  
  check('magic_step').not().isEmpty(),
  check('level_req').not().isEmpty(),
  check('class_req').not().isEmpty(),
  check('link').not().isEmpty(),
], function(req, res, next) {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {
    item_name, hp, mana, attack, defense, resistance, magic, hp_step, mana_step, attack_step, defense_step, resistance_step, magic_step, level_req, class_req, link
  } = req.body;
  Equipment.create({
    name: item_name,
    stats: {
      hp: hp,
      mana: mana,
      attack: attack,
      def: defense,
      res: resistance,
      magic: magic,
    },
    statStep: {
      hp: hp_step, 
      mana: mana_step, 
      attack: attack_step, 
      def: defense_step, 
      res: resistance_step,
      magic: magic_step
    },
    levelRequirement: level_req,
    classRequirement: class_req,
    image: link
  })
  res.render('views/main.ejs', { title: 'Express' });
});

module.exports = router;
