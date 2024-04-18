const Router = require('express');

const {getAll, buscarPorPadre, buscarPorRaza, buscarPorRazaDueño, crearMascota, updateMascota, deleteMascota} = require('../controllers/petController');

const router = Router();

//? Obtener todos los pets
router.get('/pets', getAll);

//? Buscar por padre
router.get('/padre/:padre',  buscarPorPadre);

//? Buscar por raza
router.get('/pets/raza/:raza', buscarPorRaza);

//? Buscar por raza y dueño
router.get('/pets/:padre/:raza', buscarPorRazaDueño);

//? Create mascota
router.post('/pets', crearMascota);


//? Actualizar mascota
router.put('/pets/:id', updateMascota);


//? Eliminar mascota
router.delete('/pets/:id', deleteMascota);




module.exports = router;