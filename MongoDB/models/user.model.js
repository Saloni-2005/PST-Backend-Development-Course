const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    houseNumber: Number,
    landmark: String,
    pinCode: String
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    marks: {
        type: Number,
        min: 0,
        max: 100
    },
    address: [addressSchema],
    role: {
        type: String,
        required: true,
        enum: ["student", "mentor", "admin", "instructor"],
        default: "student"
    },
    clubs: [{ type: mongoose.Schema.Types.ObjectId }]
}, { timestamps: true });

userSchema.virtual("isPassed").get(function() {
    return this.marks >= 40;
});

const User = mongoose.model("User", userSchema);

module.exports = User;