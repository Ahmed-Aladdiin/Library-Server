const { json } = require("express");
const Book = require("../models/book.model");

module.exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (book) res.json(book);
    else res.status(404).json({ message: "Couldn't find" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addABook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = await Book.create({ title, author, genre });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.editABook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, author, genre });

    if (book) res.json(await Book.findById(id));
    else res.status(404).json({ message: "Couldn't find the book" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (book) res.json({ status: "succeeded" });
    else res.status(404).json({ status: "failed", message: "Couldn't find the book" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
