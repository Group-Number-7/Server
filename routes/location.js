var express = require('express');
var router = express.Router();
var randomLocation = require('random-location')

const Enemy = require('../schemas/enemySchema');

router.get('/', (req, res)=> {
    res.send({ok: "location"})
})

router.get('/:lat/:lon', (req, res)=> {
    const {lat, lon} = req.params

    const center = {
        latitude: lat,
        longitude: lon
      }
    const radius = 80 // meters

    //console.log(Math.floor(randomLocation.distance(P1, P2)) === 4098)
    let enemies = Enemy.find();
    if(enemies.length){
        enemies.reduce((pv, cv, ci)=>{
            console.log("test", cv.location);
            pv.push(cv.location)
            return pv;
        }, [])
        res.send(enemies).end();
    }
    else {
        console.log("new enemy")
        Enemy.create({
            name:"test",
            stats:{ 
                hp:100,
                def:100,
                res: 100,
                attack:100,
                magic:100
            },
            location: randomLocation.randomCirclePoint(center, radius)
        })
    }

    var randomPoints = []
    for(var i = 0; i < 10; i++){
       randomPoints.push(randomLocation.randomCirclePoint(center, radius))
    } 

    res.send(randomPoints)
})

module.exports = router;