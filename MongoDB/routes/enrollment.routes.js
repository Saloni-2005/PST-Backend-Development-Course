const express = require("express");
const { enroll, getEnrollments, getCoursesByUser, getUsersByCourse} = require("../controllers/enrollment.controller");

const router = express.Router();

router.post("/", enroll);
router.get("/", getEnrollments);
router.get("/users/:userId/courses", getCoursesByUser);
router.get("/courses/:courseId/users", getUsersByCourse);

module.exports = router;