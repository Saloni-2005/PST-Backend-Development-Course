const Course = require("../models/courses.model");
const User = require("../models/user.model");

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email role");
        res.status(200).send({response : "List of Courses", data: courses});
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createCourse = async (req, res) => {
    try {
        const {courseId , name , instructor} = req.body;
        const user = await User.findById(instructor);
        if(!user || user.role !== 'instructor') {
            return res.status(403).json({ error: "User not authorized" });
        }
        const course = await Course.create({courseId , name , instructor});
        res.status(201).send({response : "Course created successfully", data: course});
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json(updatedCourse);
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
};
