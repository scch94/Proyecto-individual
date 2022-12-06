const { Router} = require("express");
const axios = require("axios");
const { Raza, Temperamento,Op } = require("../db");
const router = Router();
//get lista de raza de perros dependiendo de la palabra que envien
router.get('/', async (req,res,next)=>{
    let enviar=[]
    console.log("get/name")
    let buscar=req.query.name
    if(buscar){
        dogs.map(d=>{
            if(d.name.includes(buscar)){
                // let separando = d.temperament.split(",");
                // separando = separando.map((s) => s.trim());
                enviar.push({
                    id: d.id,
                    name: d.name,
                    temperament: d.temperament,
                    weight: d.weight.metric,
                    image: d.image.url
                })
            }
        })
        if(enviar.length>0) return res.send(enviar)
        res.status(204).send("no content")
        // try{
        //     const search=await Raza.findAll({
        //         where:{
        //             name:{
        //                 [Op.substring]:buscar
        //             }
        //         },
        //     });
        //     if(search.lenght>0) return res.send(search)
        //     res.status(204).send("no content")
        // }catch(e){
        //     res.status(400)
        // }
    }else{
        next()
    }
})

//primer llamado consulta a la api y llenado de bases de datos retorna info para llenar la pagina

router.get("/", async (req, res) => {
    console.log("get/all")
    axios
        .get("https://api.thedogapi.com/v1/breeds")
        .then((response) => (response = response.data))
        .then((razas)=>{
            dogs=razas
            let all=razas.map((r)=>{
                // let separando;
                // if(r.temperament){
                //     separando = r.temperament.split(",");
                //     separando = separando.map((s) => s.trim());
                // }
                // let peso=r.weight.metric.split("-")
                // peso=peso[1]+peso[0])
                // peso=peso.toString()
                let peso
                if(r.weight.metric.split(" - ").length<2){
                    peso=r.weight.metric
                }else{
                    peso=r.weight.metric.split(" - ")
                    if(peso.includes("NaN")){
                        peso=peso.join("")
                        peso=peso.split("NaN")
                        peso=peso.join(" ")
                    }else if(!peso.includes("NaN")){
                        peso=((parseInt(peso[0])+parseInt(peso[1]))/2)
                        if(r.name==="Labrador Retriever") peso="30"
                    }
                }
                return {
                    id:r.id,
                    name: r.name,
                    temperament: r.temperament,
                    weight: peso,
                    image: r.image.url,
                };
            })
            res.send(all)
        })
        // .then(async (razas) => {
        //     let bd = await razas.map((r) => {
        //         let separando;
        //         if (r.temperament) {
        //             separando = r.temperament.split(",");
        //             separando = separando.map((s) => s.trim());
        //             temperamento = [...temperamento, ...separando];
        //             const set = new Set(temperamento);
        //             temperamento = [...set];
        //         }
        //         return {
        //             name: r.name,
        //             temperament: separando,
        //             weight: r.weight.metric,
        //             image: r.image.url;
        //         };
        //     });
        // temperamento.map(async (t) => await Temperamento.create({ name: t }));
        // razas.map(async (r) => {
        //     let separando;
        //     let rase = await Raza.create({
        //         id: r.id,
        //         name: r.name,
        //         height: r.height.metric,
        //         weight: r.weight.metric,
        //         life_span: r.life_span,
        //         image: r.image.url,
        //     });
        //     if (r.temperament) {
        //         separando = r.temperament.split(",");
        //         separando = separando.map((s) => s.trim());
        //         separando.map(async (t) => {
        //             let a = await Temperamento.findOne({
        //                 where: { name: t },
        //                 });
        //             rase.addTemperamentos(a);
        //         });
        //     }
        // });
        // res.send(bd);
        // return razas;
        // })
        .catch((e) => res.status(404).send("encontramos este error " + e));
});

router.get('/:idRaza', (req,res)=>{
    let {idRaza}=req.params
    url=`https://api.thedogapi.com/v1/breeds/${idRaza}`
    axios
        .get(url)
        .then((response) => (response = response.data))
        .then((razas)=>{
            console.log(razas)
            res.send({
                id:razas.id,
                name: razas.name,
                temperament: razas.temperament,
                weight: razas.weight.metric,
                height: razas.height.metric,
                life_span: razas.life_span
            })
        })
        .catch((e)=>res.status(404).send(e))
    // try{
    //     let rasa=await Raza.findByPk(idRaza,{include:Temperamento})
    //     res.send(
    //         {
    //             id:rasa.id,
    //             name:rasa.name,
    //             height:rasa.height,
    //             weight:rasa.weight,
    //             image:rasa.image,
    //             Temperamentos:rasa.Temperamentos
    //         })
    // }catch(e){
    //     res.status(400).send(e)
    // }
})

//crear un perro

router.post("/", async (req, res) => {
    let { name, height, weight, life_span, id, img , temperament} = req.body;
    let separando
    try {
        console.log(1)
        if (!name || !height || !weight) {
        res.status(404).send("datos incompletos");
        } else {
        let nuevo = await Raza.create({ name, height, weight, life_span, id ,img});
        if (temperament) {
            console.log(temperament)
            separando = temperament.split(",");
            separando = separando.map((s) => s.trim());
            console.log(separando)
            separando.map(async (t) => {
                let [a,created] = await Temperamento.findOrCreate({
                    where: { name: t },
                    defaults:{
                        name:t
                    }
                });
                nuevo.addTemperamentos(a);
            });
        }
        res.send(nuevo);
        }
    } catch (e) {
        res.status(404).send(e);
    }
    });

module.exports = router;
