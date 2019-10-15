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
    const radius = 80 // meters

    Enemy.find().then(async (enemies)=>{
        let enemyRes = []
        if(enemies.length){
            enemies = enemies.sort((a, b) => {
                if(randomLocation.distance(a.location, center) < randomLocation.distance(b.location, center)){
                    return -1;
                } else return 1;
            })
            enemyRes = enemies.reduce((pv, cv, ci)=>{
                if(randomLocation.distance(cv.location, center) < radius)
                    pv.push(cv)
                return pv;
            }, [])
        }
        if(enemyRes.length >= spawn){
            res.send(enemyRes.slice(0,spawn));
            next();
        } else{
            let newEnemy = {}
            while(enemyRes.length < spawn){
                newEnemy = await Enemy.create({
                    name:String(Math.random()),
                    stats:{ 
                        hp:100,
                        def:100,
                        res: 100,
                        attack:100,
                        magic:100
                    },
                    location: randomLocation.randomCirclePoint(center, radius),
                })
                enemyRes.push(
                    newEnemy
                )
            }
            res.send(enemyRes.slice(0,spawn));
            next();
        }
    });
})

module.exports = router;