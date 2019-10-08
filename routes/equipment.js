var express = require('express');
var router = express.Router();

const Equipment = require('../schemas/equipmentSchema');
const User = require('../schemas/userSchema');
const EquipmentTypes = require('../schemas/EquipmentTypes');

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId).populate('equipment').exec((err, user)=>{
        if(!err){
            if(user){
                res.send(user.equipment)
            } else{
                console.log("no user found")
                res.send([])
            }
        } else {
            console.log("error finding user")
                res.send([])
        }
    })
})
router.post('/new', (req, res) => {
    const { name, userId } = req.body
    User.findById(userId).populate('equipment').exec((err, user)=>{
        if(user && !err){
            let eq = new Equipment({
                ...EquipmentTypes.sword[name],
                rating: "common",
                level: 1
            })
            eq.save().catch((err)=>{
                console.log("err saving eq", err)
                res.send([])
            }).then((new_eq)=>{
                user.equipment.push(new_eq)
                user.save().then((new_user)=>{
                    res.send(new_eq);
                }).catch(()=>{
                    console.log("err occurred while adding eq", err);
                    res.send([])
                });
            });
        } else {
            if(err) {
                console.log("err", err)
                res.send([])
            }
            console.log("no user found");
            res.send([])
        }
    })
})

module.exports=router;