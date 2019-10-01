var express = require('express');
var router = express.Router();
const User = require('../schemas/userSchema');

router.get('/login/:email', function(req, res, next) {
  const { email } = req.params;
  User.findOne({
    email: email.trim().toLowerCase()
  }, (err, doc) => {
    if(!err){
      if(doc){
        res.send({user: doc, msg: "user found", status: 1})
      } else{
        res.send({msg: "user not found", status: -1})
      }
    } else{
      res.send({msg: "error finding user", status: -1})
    }
  })
});

router.post('/signup', (req, res) => {
  const { email, username } = req.body;
  User.create({
    email: email.trim().toLowerCase(),
    username: username.trim().toLowerCase(),
    dateCreated: new Date()
  }).then((doc)=>{
    if(doc){
      res.send({msg: "user created", status: 1, user: doc})
    }
  }).catch((err)=>{
    res.send({msg: "error creating user", status: -1})
    res.send({ok: false})
  })
})

module.exports = router;
