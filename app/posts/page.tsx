import { connectDB } from "@/lib/db";
import Link from "next/link";
import Note from "@/models/Note";
import { Post } from "@/types/post";


//direct to database
export default async function Page() {
  try {
    // const response = await fetch(
    //   "http://localhost:3000/api/notes/",
    //   // "https://dummyjson.com/posts?select=title,id",
    //   {
    //     cache: "no-store",
    //   },
    // );
    // const DataPosts: Post[] = await response.json();

    await connectDB();
    const DataPosts = await Note.find().lean();

    return (
      <div className="p-5">
        <h1 className="text-xl font-bold mb-4">All Posts</h1>
        <ul>
          {DataPosts.map((post: any) => (
            <li key={post._id.toString()} className="border mb-3 p-3">
              <Link href={`/posts/${post._id}`}>
                <h2 className="font-bold text-blue-600">{post.title}</h2>
                <p>{post.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (err) {
    console.log(err);
    throw new Error("Posts not found");
  }
}
