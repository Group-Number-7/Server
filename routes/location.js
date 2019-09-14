var express = require('express');
var router = express.Router();
var randomLocation = require('random-location')

const Enemy = require('../schemas/enemySchema');

router.get('/', (req, res)=> {
    res.send({ok: "location"})
})

router.get('/enemies/:lat/:lon/:spawn', (req, res, next)=> {
    const {lat, lon, spawn} = req.params

    const center = {
        latitude: lat,
        longitude: lon
      }
    const radius = 60 // meters

    //console.log(Math.floor(randomLocation.distance(P1, P2)) === 4098)
    Enemy.find().then(async (enemies)=>{
        let enemyRes = []
        if(enemies.length){
            console.log("enemies exist")
            enemyRes = enemies.reduce((pv, cv, ci)=>{
                if(randomLocation.distance(cv.location, center) < radius)
                    pv.push(cv)
                return pv;
            }, [])
        } else{
            console.log("no enemies, making" + String(spawn));
            for(var i = 0; i < spawn; i++){
                enemyRes.push(
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
                )
            }
            res.send(enemyRes);
            next();
        }
        if(enemyRes.length >= spawn){
            console.log("already " + String(spawn) + " amount")
            res.send(enemyRes.slice(0,spawn));
            next();
        }
        else {
            let newEnemy = {}
            while(enemyRes.length <= spawn){
                console.log("new enemy", enemyRes.length);
                newEnemy = await Enemy.create({
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
                console.log("n", newEnemy)
                enemyRes.push(
                    newEnemy
                )
            }
            res.send(enemyRes)
            next();
        }
    });
})

module.exports = router;