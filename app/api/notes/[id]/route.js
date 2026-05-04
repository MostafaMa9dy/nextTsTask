import { connectDB } from "@/lib/db";
import Note from "@/models/Note";

 export async function GET(req, context) {
  await connectDB();

  const { id } = await context.params;

  const note = await Note.findById(id);

  return Response.json(note);
}





 export async function PUT(req, context) {
  await connectDB();

  const { id } = await context.params;

  const body = await req.json();

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    body,
    { returnDocument: "after" }
  );

  return Response.json(updatedNote);
}




 export async function DELETE(req, context) {
  await connectDB();

  const { id } = await context.params;

  await Note.findByIdAndDelete(id);

  return Response.json({
    message: "Deleted successfully",
  });
}