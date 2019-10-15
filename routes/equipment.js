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

router.put('/equip/:userId/:eqId/:type', (req, res) => {
    User.findById(req.params.userId).populate({path: "equipment", match: { type: req.params.type }}).then((user, err) => {
        if(!err){
            if(user){
                let res_eq = {}
                user.equipment.map((eq, i) => {
                    if(eq._id == req.params.eqId){
                        eq.equipped = true;
                        res_eq = eq
                        eq.save()
                    } else if(eq.type === req.params.type && eq.equipped){
                        eq.equipped = false;
                        eq.save()
                    }
                })
                res.send(res_eq)
            } else {
                console.log("user not found")
                res.send([])
            }
        } else {
            console.log("err finding user")
            res.send([])
        }
    })
})

module.exports=router;