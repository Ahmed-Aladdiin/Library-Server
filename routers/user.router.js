const express = require("express");
const {
  getAllUsers,
  createUser,
  getOneUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controllers");
const router = express.Router();

router.route("/")
.get(getAllUsers)
.post(createUser);

router.route("/:id")
.get(getOneUser)
.patch(editUser)
.delete(deleteUser);

module.exports = router;