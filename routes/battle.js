var express = require('express');
var router = express.Router();
const Enemy = require('../schemas/enemySchema');

router.get('/', (req, res)=> {
    res.send({ok: "battle"})
})

module.exports = router;

 router.post('/attack/:id', function(req, res, next) {
    const amount = req.amount;
    Enemy.findById(req.params.id).then((enemy)=>{
        if(enemy){
           const newlife = enemy.stats.hp - amount
            if(newlife <= 0 ) {
                Enemy.findByIdAndDelete(req.params.id)
                res.send(1)
            }  else {
                enemy.stats.hp = newlife
                enemy.save();
                res.send(0)


            }

        } else {
//enemy not found
        res.send(-1)
        }
    }, (err)=>{
// error occured finding enemy
    res.send(-1)
    })
 })




