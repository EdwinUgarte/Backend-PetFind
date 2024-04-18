const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const petsSchema = require("../controllers/petController");

const router = express.Router();


//? Obtener todos los pets
router.get('/pets', (req, res) => {
    petsSchema.find()
    .then((data) => res.json(data))
    .catch(error => res.json({message: error}))
})

//? Buscar por padre
router.get('/padre/:padre', (req, res) => {
    const {padre} = req.params;
    petsSchema.find().where('padre').equals(padre.toLowerCase())
    .then(data => res.json(data))
    .catch(error => res.json(error))
})

//? Buscar por raza
router.get('/pets/raza/:raza', (req, res) => {
    const {raza} = req.params;
    petsSchema.find({raza: raza.toLowerCase()})
    .then(data => res.json(data))
    .catch(error => res.json(error))
})

//? Buscar por raza y dueño
router.get('/pets/:padre/:raza', (req, res) => {
    const {padre, raza} = req.params;
    // petsSchema.find().where('padre').equals(padre)
    petsSchema.find({$and: [{ padre: padre.toLowerCase()} , { raza: raza.toLowerCase() }]})
    .then(data => res.json(data))
    .catch(error => res.json(error))
})

//? Create mascota
router.post('/pets', (req, res) => {

    const pet = petsSchema(req.body);
    pet.padre = pet.padre.toLowerCase();
    pet.raza = pet.raza.toLowerCase();
    pet.save()
    .then(data => {res.json(data);
       console.log("Guardado con exito");
    })
    .catch(error => res.json({menssage: error}));
})



//? Actualizar mascota
router.put('/pets/:id', (req, res) => {
    const {id} = req.params;
    const {name, padre, edad, foto, telefono, direccion} = req.body;
    petsSchema.updateOne({_id: id}, { $set: {name, padre, edad, foto, telefono, direccion}} )
    .then(data => {res.json(data)})
    .catch(error => res.json({menssage: error}));
})


//? Eliminar mascota
router.delete('/pets/:id', (req, res) => {
    const {id} = req.params;
    petsSchema.deleteOne({_id: id})
    .then(data => {res.json(data)})
    .catch(error => res.json({menssage: error}));


})




module.exports = router;