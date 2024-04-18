const petModel = require("../models/pet.model");


const getAll = async (req, res) => {
    try {
    let mascotas = await petModel.find().exec();
    res.status(200).send({mascotas});
    } catch (error) {
    res.status(500).send({message: "Error al encontrar las mascotas"})    
    } 
}; 

const buscarPorPadre = async(req, res) => {
    const {padre} = req.params;
    try {
        let mascotas = await petModel.find().where('padre').equals(padre.toLowerCase()).exec();
        res.status(200).send({mascotas});
    } catch (error) {
        res.status(500).send({message: "Error al encontrar las mascotas"})    
    }
};

const buscarPorRaza = async(req, res) => {
    const {raza} = req.params;
    try {
          let mascotas =  await petModel.find({raza: raza.toLowerCase()});
          res.status(200).send({mascotas});
    } catch (error) {
        res.status(500).send({message: "Error al encontrar las mascotas"})    
    }
};

const buscarPorId = async(req, res) => {
    const {id} = req.params;
    try {
          let mascota =  await petModel.findById(id);
          res.status(200).send({mascota});
    } catch (error) {
        res.status(500).send({message: "Error al encontrar las mascotas"})    
    }
};

const buscarPorRazaDueño = async (req, res) => {
    const {padre, raza} = req.params;
    // petModel.find().where('padre').equals(padre)
    try {
       let mascotas = await petModel.find({$and: [{ padre: padre.toLowerCase()} , { raza: raza.toLowerCase() }]})
       res.status(200).send({mascotas});
    } catch (error) {
        res.status(500).send({message: "Error al encontrar las mascotas"})    
    }
}

const crearMascota = async (req, res) => {
    const pet = petModel(req.body);
    pet.padre = pet.padre.toLowerCase();
    pet.raza = pet.raza.toLowerCase();

    try {
        let mascota = await pet.save();
        res.status(200).send({mascota});
    } catch (error) {
        res.status(500).send({message: error})    
    }
}


const updateMascota = async(req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const mascota = await petModel.findByIdAndUpdate(id, update);
        res.status(200).send({mascota: update, message: "Se actualizo con exito"});
    } catch (error) {
        res.status(500).send({message: error})    
    }   
}

const deleteMascota = async(req, res) => {
    const id = req.params.id;

    try {
        const mascota = await petModel.findByIdAndDelete(id);
        res.status(200).send({mascota: mascota, message: "Se elimino exitosamente"});
    } catch (error) {
        res.status(500).send({message: error})    
    }   
}

  
module.exports = {
    getAll,
    buscarPorPadre,
    buscarPorRaza,
    buscarPorRazaDueño,
    crearMascota,
    updateMascota,
    deleteMascota,
    buscarPorId
}

