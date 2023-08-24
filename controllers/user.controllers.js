const User = require("../models/user.model");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const user = await User.create({ name, age, email });
    res.status(201).json({ user, status: "success" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body._id) delete req.body._id;
    const edited = await User.findByIdAndUpdate(id, req.body);

    if (!edited) res.status(404).json({ message: "couldn't find the user" });

    res.json(await User.findById(id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted)
      res.status(404).json({ status: "failed", message: "couldn't find Id" });

    res.json({ status: "succeeded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
