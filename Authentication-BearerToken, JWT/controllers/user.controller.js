// business logic

const { getUsers, setUsers } = require("../fs");
const User = require("../models/user.model");


// Get all users
const getAllUsers = async (req, res) => {
    const {search, order="desc", sortBy="createdAt", page=1, limit=10} = req.query;

    let users = [];
    const sortOrder = order === "asc" ? 1 : -1;
    const sortCondition = {[sortBy]: sortOrder};
    const skip =  (Number(page)-1)*Number(limit);
    let searchingCondition = {};
    if(search){
        searchingCondition = {name: {$regex: search, $options:'i'}}
    } 
    users = await User.find(searchingCondition).limit(limit).skip(skip).sort(sortCondition);
    res.json({
        message: "List of all users",
        response: users
    });
};

// Create a new user
const createNewUser = async (req, res) => {
    const body = req.body;
    console.log(body);

    // const data = getUsers();
    // const users = data.users;

    // const newId = Number(users[users.length - 1]?.id || 0) + 1;
    // const newUser = { id: newId, ...body };
    // users.push(newUser);
    // setUsers(data);

    // const newUser = new User(body);
    // await newUser.save();

    await User.create(body);

    res.json({
        message: "New user created",
        response: getUsers().users
    });
};

// Update user by ID
const updateUser = async (req, res) => {
    const id = Number(req.params.id);
    console.log(id);

    const updatedUser = req.body;

    // const data = getUsers();
    // const users = data.users;

    // const index = users.findIndex(user => user.id === id);

    // if (index === -1) {
    //     return res.status(404).send({ message: "User not found" });
    // }

    // users[index] = { ...users[index], ...updatedUser };
    // setUsers(data);

    const user = await User.findByIdAndUpdate(id, updatedUser, {new:true});
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    res.send({
        message: "User updated",
        response: data.users
    });
};

// Delete user by ID
const deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    // let data = getUsers();
    // let users = data.users;

    // const index = users.findIndex(user => user.id === id);

    // if (index === -1) {
    //     return res.status(404).send({ message: "User not found" });
    // }

    // const filteredUsers = users.filter(user => user.id !== id);
    // data.users = filteredUsers;
    // setUsers(data);

    const deletedUser = await User.findByIdAndDelete(id);

    if(!deletedUser){
        res.status(404).send({message:"User not found"});
    }

    res.status(200).send({
        message: "User deleted",
        response: deletedUser
    });
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };

