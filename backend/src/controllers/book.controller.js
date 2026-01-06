import { Book } from "../models/book.models.js";
import { ApiError } from "../utils/ApiError.js";
import { apiResponse } from  '../utils/Apiresponse.js'
import { asyncHandler } from  '../utils/Asynchandler.js'

 
export const addBook = asyncHandler(async (req, res) => {
  const { title, author, isAvailableForSwap, expectedBook } = req.body;

  if (!title || !expectedBook) {
    throw new ApiError(400, "Missing book details");
  }

  const existedBook = await Book.findOne({ title });
  if (existedBook) {
    throw new ApiError(409, "Book already exists");
  }

  const book = await Book.create({
    title,
    author,
    isAvailableForSwap,
    owner: req.user._id,
    expectedBook,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, book, "Book added successfully"));
});
 
export const getBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, book, "Book found"));
});

 
export const updateBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, author, isAvailableForSwap, expectedBook } = req.body;

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { title, author, isAvailableForSwap, expectedBook },
    { new: true, runValidators: true }
  );

  if (!updatedBook) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBook, "Book updated successfully"));
});

 
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Book deleted successfully"));
});
