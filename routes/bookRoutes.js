const express = require("express");
const router = express.Router();

const Book = require("../models/bookModel");

// Add a new book
router.post("/api/books", async (req, res) => {
    try {
        const { title,author,category } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const book = new Book({
            title,author,category
        });

        await book.save();

        res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding book"
        });
    }
});


// Get books with pagination
router.get("/api/books", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);

        const totalRecords = await Book.countDocuments();

        res.status(200).json({
            page: page,
            limit: limit,
            totalRecords: totalRecords,
            books: books
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching books"
        });
    }
});


// Update book availability
router.patch("/api/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            {
                availability: req.body.availability
            },
            {
                new: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Availability updated",
            book: book
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating book"
        });
    }
});

module.exports = router;