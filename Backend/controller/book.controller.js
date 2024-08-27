import mongoose from "mongoose";
import {books} from "../models/book.model.js";

export const register = async (req, res) => {
    try {
        const { title, author, isbn, publishedDate } = req.body;

        if (!title || !author || !isbn || !publishedDate) {
            return res.status(404).json({
                message: "Item not found",
                success: false
            });
        };

        const book_isbn = await books.findOne({ isbn });
        if (book_isbn) {
            return res.status(400).json({
                message: "isbn already exists",
                success: false
            });
        };

        await books.create({
            title,
            author,
            isbn,
            publishedDate
        });

        return res.status(201).json({
            message: "Book registered successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error in register controller:", error);
        return res.status(400).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getdata = async (req, res) => {
    try {
        //Pagination, search, and Sorting assignment
        const page = Number(req.query.page) || 1,
            limit = Number(req.query.limit) || 10,
            skip = Number(req.query.skip) || (page - 1) * limit,
            search = req.query.search || '',
            sortBy = req.query.sortBy,
            orderBy = req.query.orderby === 'asc' ? 1 : -1;

        // Searching
        const searchQuery = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ]
        };
  
        const query = books.find(searchQuery).skip(skip).limit(limit)

        //Sorting
        if(sortBy){
            query.sort({[sortBy]: orderBy});
        }

        console.log("Search Query:", JSON.stringify(searchQuery, null, 2));

        const all_books = await query.exec();

        return res.status(200).json({
            message: "Books retrieved successfully",
            success: true,
            data: all_books,
            curr_page: page
        });
    } catch (error) {
        console.error("Error in getdata controller:", error);
        return res.status(400).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getdata_id = async (req, res) => {
    try {
        const book_id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(book_id)) {
            return res.status(400).json({
                message: "Invalid book ID",
                success: false
            });
        }

        const book_dets = await books.findById(book_id);
        if (!book_dets) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Book retrieved successfully",
            success: true,
            data: book_dets
        });
    } catch (error) {
        console.error("Error in getBookById controller:", error);

        return res.status(400).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const updatedata_id = async (req, res) => {
    try {
        const book_id = req.params.id;
        const updated_data = req.body;

        if (!mongoose.Types.ObjectId.isValid(book_id)) {
            return res.status(400).json({
                message: "Invalid book ID",
                success: false
            });
        }

        const book_dets = await books.findById(book_id);
        if (!book_dets) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            });
        }

        if (Object.keys(updated_data).length === 0) {
            return res.status(400).json({
                message: "No fields provided to update",
                success: false
            });
        }

        const updatedBook = await books.findByIdAndUpdate(book_id, updated_data, {
            new: true,
            runValidators: true
        });

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Data updated successfully",
            success: true,
            data: updatedBook
        });
    } catch (error) {
        console.error("Error in updatedata_id controller:", error);

        return res.status(400).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const deletebook_id = async (req, res) => {
    try {
        const book_id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(book_id)) {
            return res.status(400).json({
                message: "Invalid book ID",
                success: false
            });
        }

        const result = await books.findByIdAndDelete(book_id);

        if (!result) {
            return res.status(404).json({
                message: "Book not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error in deletebook_id controller:", error);

        return res.status(400).json({
            message: "Internal server error",
            success: false,
        });
    }
}