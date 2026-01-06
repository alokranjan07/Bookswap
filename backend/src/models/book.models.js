import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAvailableForSwap: {
      type: Boolean,
      default: true,
    },
    expectedBook: {
      type: String,  
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
