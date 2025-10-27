// courses

// courseId
// name:
// Instructor : Object.Id ref: users

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    name: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
