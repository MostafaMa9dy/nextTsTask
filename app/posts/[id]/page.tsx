import React from "react";

export default async function PostDetails({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params; 

  const response = await fetch(
    `http://localhost:3000/api/notes/${_id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Post not found");
  }

  const post = await response.json();

  return (
    <div className="container mx-auto p-4 md:p-8 flex justify-center">
      <div className="card bg-base-100 w-full max-w-2xl shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">
            {post.title}
          </h2>

          <p className="text-lg mt-4">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
}