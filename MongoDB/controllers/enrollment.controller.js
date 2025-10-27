const Users = require("../models/user.model");
const Courses = require("../models/courses.model");
const Enrollment = require("../models/enrollment.model");

const enroll = async (req, res) => {
    try {
        const {userId , courseId } = req.body;
        const user = await Users.findById(userId);
        if(!user) {
            return res.status(403).json({ error: "User not authorized" });
        }
        const course = await Courses.findById(courseId);
        if(!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const enrollment = await Enrollment.create({ userId, courseId });
        res.status(201).json({ message: "Enrollment successful", data: enrollment });
    } catch (error) {
        console.error("Error enrolling user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate("userId", "name email").populate("courseId", "title");
        res.status(200).json({ message: "Enrollments fetched successfully", data: enrollments });
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCoursesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Users.findById(userId);
        if(!user) {
            res.status(404).json({message : "User not found"})
        }
        const enrollments = await Enrollment.find({ userId }).populate("courseId");
        res.status(200).json({ message: "Courses fetched successfully", data: enrollments });
    } catch (error) {
        console.error("Error fetching courses by user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUsersByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Courses.findById(courseId);
        if(!course) {
            res.status(404).send({message : "Course not found"})
        }
        const enrollments = await Enrollment.find({ courseId }).populate("userId", "name email");
        res.status(200).json({ message: "Users fetched successfully", data: enrollments });
    } catch (error) {
        console.error("Error fetching users by course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    enroll,
    getEnrollments,
    getCoursesByUser,
    getUsersByCourse
};
