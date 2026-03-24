import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["url", "note"],
    required: true,
  },
  title: String,
  url: String,
  content: String,
}, { timestamps: true });


const userModel = mongoose.model("Item", itemSchema);

export default userModel;