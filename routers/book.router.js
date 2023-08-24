const express = require("express");
const {
  getAllBooks,
  addABook,
  getOneBook,
  editABook,
  deleteABook,
} = require("../controllers/book.controllers");
const router = express.Router();

router.route("/")
.get(getAllBooks)
.post(addABook);

router.route("/:id")
.get(getOneBook)
.patch(editABook)
.delete(deleteABook);

module.exports = router;
