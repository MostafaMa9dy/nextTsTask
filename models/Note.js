import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

export default mongoose.models.Note || mongoose.model("Note", noteSchema);