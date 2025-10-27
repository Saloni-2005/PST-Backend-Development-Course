// business logic with MongoDB (Mongoose)

const User = require("../models/user.model");

// Get all users (with optional search by name)
const getAllUsers = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;   // default page = 1
        const limit = parseInt(req.query.limit) || 1; // default 10 per page
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" }; // case-insensitive search
        }

        // Get total count for pagination info
        const totalUsers = await User.countDocuments(query);

        // Fetch users with pagination and sorting by name alphabetically
        const users = await User.find(query)
            .sort({ name: 1 }) // ascending (A → Z).
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "List of all users",
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            response: users
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
};

// Create a new user
const createNewUser = async (req, res) => {
    try {
        const body = req.body;
        const newUser = new User(body);
        await newUser.save();

        res.status(201).json({
            message: "New user created",
            response: newUser
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated",
            response: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted",
            response: deletedUser
        });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };