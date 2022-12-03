const { Router } = require('express');
const axios=require('axios');
const {Raza,Temperamento}= require('../db');



const router = Router();

router.get('/', async (req,res)=>{
    let temperamento=[]
    axios.get('https://api.thedogapi.com/v1/breeds')
        .then(response=>response=response.data)
        .then( async razas=>{
            const bd=await razas.map(r=>{
                // Raza.create({
                //     id:r.id,
                //     name:r.name,
                //     height:r.height.metric,
                //     weight:r.weight.metric,
                //     life_span:r.life_span
                // })
                if(r.temperament){
                    let separando=r.temperament.split(',')
                    separando=separando.map(s=>s.trim())
                    temperamento=[...temperamento,...separando]
                    const set=new Set(temperamento)
                    temperamento=[...set]
                }
                return {name:r.name, weight:r.weight.metric}
            })
            temperamento.map(async t=>await Temperamento.create({name:t}))
            const bdf=await razas.map(async r=>{
                let rase=await Raza.create({
                    id:r.id,
                    name:r.name,
                    height:r.height.metric,
                    weight:r.weight.metric,
                    life_span:r.life_span
                })
                if(r.temperament){
                    let separando=r.temperament.split(',')
                    separando=separando.map(s=>s.trim())
                    separando.map(async t=>{
                        let a=await Temperamento.findOne({
                            where:{name:t}
                        })
                        rase.addTemperamentos(a)
                    })
                }
            })
            
            res.send(bd)
            return razas
        })
        .catch(e=>res.status(404).send("encontramos este error "+e))
})

router.post('/',async (req,res)=>{
    let{name,height,weight,life_span,id,img}=req.body
    try{
        if(!name||!height||!weight){
            res.status(404).send("datos incompletos")
        }else{
            let nuevo=await Raza.create({name,height,weight,life_span,id})
            res.send(nuevo)
        }
    }catch(e){
        res.status(404).send(e)
    }

})






module.exports=router