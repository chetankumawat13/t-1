// models/Item.js

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // 🔥 faster queries
    },

    type: {
      type: String,
      enum: ["url", "note"],
      required: true,
    },

    title: {
      type: String,
      trim: true,
    },

    url: {
      type: String,
      trim: true,
    },

    content: String,

    summary: {
      type: String,
      trim: true,
    },

    // 🔹 RAW TAGS (AI ke liye)
    tags: {
      type: [String],
      default: [],
      index: true,
    },

    // 🔥 MAIN ANALYTICS FIELD
    hotTag: {
      type: String,
      default: "general",
      trim: true,
      lowercase: true,
      index: true,
    },

    // 🔥 SOURCE FIELD
    source: {
      type: String,
      default: "other",
      trim: true,
      lowercase: true,
      index: true,
    },

    // 🖼 Thumbnail (future use)
    thumbnail: {
      type: String,
      default: null,
    },

    // 🔥 SOFT DELETE SYSTEM
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    // 📦 ARCHIVE SYSTEM
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


// ⚡ COMPOUND INDEX (SUPER IMPORTANT FOR PERFORMANCE)
itemSchema.index({ userId: 1, isDeleted: 1, isArchived: 1 });
itemSchema.index({ userId: 1, createdAt: -1 });

const Item = mongoose.model("Item", itemSchema);

export default Item;