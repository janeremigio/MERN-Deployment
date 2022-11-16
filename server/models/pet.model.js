const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet Name required! Please, enter a Name."],
        minlength: [3, "Pet Name requires 3 or more characters."]
    },
    type: {
        type: String,
        required: [true, "Pet Type required! Please, enter a Type."],
        minlength: [3, "Pet Name requires 3 or more characters."]
    },
    description: {
        type: String,
        required: [true, "Pet Description required! Please, enter a Description."],
        minlength: [3, "Pet Description requires 3 or more characters."]
    },
    skillOne: {
        type: String,
    },
    skillTwo: {
        type: String,
    },
    skillThree: {
        type: String,
    }
}, {timestamps: true});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;