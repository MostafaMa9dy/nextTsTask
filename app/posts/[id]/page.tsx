import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Post } from "@/types/post";

export default async function PostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Post not found");
  }

  const post: Post = await response.json();

  async function deletePost() {
    "use server";

    await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="container mx-auto p-4 md:p-8 flex justify-center">
      <div className="card bg-base-100 w-full max-w-2xl shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">{post.title}</h2>

          <p className="text-lg mt-4">{post.content}</p>

          <div className="flex gap-4 mt-6">
            <Link href={`/posts/edit/${id}`} className="btn btn-warning btn-sm flex items-center gap-2">
              Edit Post
            </Link>
            
            <form action={deletePost}>
              <button type="submit" className="btn btn-error btn-sm flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
