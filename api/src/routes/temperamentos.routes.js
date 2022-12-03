const { Router} = require("express");
const axios = require("axios");
const { Raza, Temperamento,Op } = require("../db");


const router = Router();

router.get('/', async (req,res)=>{
    try{
        let temperamentos= await Temperamento.findAll()
        res.send(temperamentos)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;