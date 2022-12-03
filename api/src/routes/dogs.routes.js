const { Router} = require("express");
const axios = require("axios");
const { Raza, Temperamento,Op } = require("../db");

const router = Router();

router.get('/', async (req,res,next)=>{
    let buscar=req.query.name
    if(buscar){
        try{
            console.log(buscar)
            const search=await Raza.findAll({
                where:{
                    name:{
                        [Op.substring]:buscar
                    }
                },
            });
            if(search.lenght>0) return res.send(search)
            res.status(204).send("no content")
        }catch(e){
            res.status(400)
        }
    }else{
        next()
    }
})

router.get("/", async (req, res) => {
    let temperamento = [];
    axios
        .get("https://api.thedogapi.com/v1/breeds")
        .then((response) => (response = response.data))
        .then(async (razas) => {
            let bd = await razas.map((r) => {
                let separando;
                if (r.temperament) {
                    separando = r.temperament.split(",");
                    separando = separando.map((s) => s.trim());
                    temperamento = [...temperamento, ...separando];
                    const set = new Set(temperamento);
                    temperamento = [...set];
                }
                return {
                    name: r.name,
                    temperament: separando,
                    weight: r.weight.metric,
                    image: r.image.url,
                };
            });
        temperamento.map(async (t) => await Temperamento.create({ name: t }));
        razas.map(async (r) => {
            let separando;
            let rase = await Raza.create({
                id: r.id,
                name: r.name,
                height: r.height.metric,
                weight: r.weight.metric,
                life_span: r.life_span,
                image: r.image.url,
            });
            if (r.temperament) {
                separando = r.temperament.split(",");
                separando = separando.map((s) => s.trim());
                separando.map(async (t) => {
                    let a = await Temperamento.findOne({
                        where: { name: t },
                        });
                    rase.addTemperamentos(a);
                });
            }
        });
        res.send(bd);
        return razas;
        })
        .catch((e) => res.status(404).send("encontramos este error " + e));
});



router.post("/", async (req, res) => {
    let { name, height, weight, life_span, id, img } = req.body;
    try {
        if (!name || !height || !weight) {
        res.status(404).send("datos incompletos");
        } else {
        let nuevo = await Raza.create({ name, height, weight, life_span, id ,img});
        res.send(nuevo);
        }
    } catch (e) {
        res.status(404).send(e);
    }
    });

module.exports = router;
