var express = require('express');
var router = express.Router();
const Enemy = require('../schemas/enemySchema');
const User = require ('../schemas/userSchema');

router.get('/', (req, res)=> {
    res.send({ok: "battle"})
})

module.exports = router;

 router.get('/kill/:id', async (req, res, next) => {
     try{
        await Enemy.findByIdAndDelete(req.params.id)
        res.send({
            exp: 100
        })
     } catch(err){
         console.log('err', err)
         res.send()
     }
 })


 router.post('/enemy-attack/:userid', function(req, res, next) {
    const amount = req.amount;
    User.findById(req.params.id).then((user)=>{
        if(user){
           const newlife = amount >= 0 ? user.stats.hp - amount : user.stats.hp
            if(newlife <= 0 ) {
                // User.findByIdAndDelete(req.params.id)
                user.stats.hp = 
                res.send({code: 1})
            }  else {
                user.stats.hp = newlife
                user.save();
                res.send({code: 0})
            }
        } else {
            res.send({code: -1})
        }
    }, (err)=>{
// error occured finding enemy
    res.send({code: -1})
    })
 })


 router.post('/level-up/:userid', function(req, res, next) {
    const amount = req.amount;
    User.findById(req.params.id).then((user)=>{
        if(user){
            user.level++
            user.save();

            

        } else {
//enemy not found
        res.send(-1)
        }
    }, (err)=>{
// error occured finding enemy
    res.send(-1)
    })
 })







