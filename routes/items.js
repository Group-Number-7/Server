var express = require('express');
var router = express.Router();

const Item = require('../schemas/itemSchema');
const User = require('../schemas/userSchema');
//need to test
const getItems = (req, res, next) => {
    let id = req.params.userId
    res.locals.eq = []
    res.locals.complete = false
    User.findOne({_id: id}, (err, user) => {
        if(!err){
            if(user){ // check if user was found
                if(user.items.length){ // make sure user has equipment
                    user.items.map(async (user_item, index)=> { // iterate through user equipment
                        Item.findById(user_item.itemId, (err, item)=>{ // find equipment data from user equipment id
                            if(!err){ // error handling
                                if(item){ // if equipment was found
                                    for(var i = 0; i < user_item.quantity; i++){ // push new equipment to return list for each of users quantity of that item
                                        res.locals.eq.push(item)
                                    }
                                    if(index+1 === user.items.length) next() // if last in user equipment list move to next function
                                } else {
                                    console.log("no eq")
                                    if(index+1 === user.items.length) next() // if last in user equipment list move to next function
                                }
                            } else {
                                console.log("err", err)
                                if(index+1 === user.items.length) next() // if last in user equipment list move to next function
                            }
                        })
                    })
                }
            } else{
                console.log("no found")
                return []
            }
        } else{
            console.log("err", err);
            return []
        }
    })
}
router.get('/:userId', getItems, async (req, res) => {
    console.log("testing");
    res.send(res.locals.eq)
});

module.exports=router;