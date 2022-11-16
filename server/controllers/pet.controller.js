const Pet = require ("../models/pet.model");

// find/read all
module.exports.findAllPets = (req, res) => {
    Pet.find()
        .then(allPets => res.json(allPets))
        .catch(err => res.json({ message: 'Something went wrong...', error: err }));
}

// find/read one
module.exports.findOnePet = (req, res) => {
    Pet.findOne({ _id: req.params.id }) // .id is a parameter variable matching w/ :id in routes, not _id
        .then(onePet => res.json({ pet: onePet }))
        .catch(err => res.json({ message: 'Something went wrong...', error: err }));
}

// create
module.exports.createPet = (req, res) => {
    Pet.create(req.body) // req.body refers to schema in model and form handler
        .then(newPet => res.json(newPet))
        .catch(err => res.status(400).json(err));
}

// update  / edit
module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params.id }, // what is being searched
        req.body, // the data itself
        { new: true, runValidators: true } // options object. new returns new object. runValidators runs validations on update
    )
        .then(updatedPet => res.json({ pet: updatedPet }))
        // .catch(err => res.json(err));
        .catch(err => res.status(400).json(err));
}

// delete
module.exports.deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong...', error: err }));
}