const PetController = require('../controllers/pet.controller');

module.exports = app => {
                                            // must match w/ controllers
    app.get('/api/pets', PetController.findAllPets); // find all
    app.post('/api/pets', PetController.createPet); // create
    app.get('/api/pets/:id', PetController.findOnePet); // find one
    app.put('/api/pets/:id', PetController.updatePet); // update/edit
    app.delete('/api/pets/:id', PetController.deletePet); // delete
}