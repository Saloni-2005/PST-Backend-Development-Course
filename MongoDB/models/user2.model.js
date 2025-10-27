const mongoose = require("mongoose");

const User2Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 },
    address: {
        street: { type: String },
        city: { type: String },
        zip: { type: String }
    }
});

const Address2Schema = new mongoose.Schema({
    street: { type: String },
    city: { type: String },
    zip: { type: String }
});

const User2 = mongoose.model("User2", User2Schema);
const Address2 = mongoose.model("Address2", Address2Schema);

module.exports = { User2, Address2 };
