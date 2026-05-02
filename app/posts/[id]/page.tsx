import React from "react";

export default async function PostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`, {
      next: { revalidate: 20 }
    });

    if (!response.ok) {
      throw new Error("Post not found");
    }

    const post = await response.json();

    console.log(post)

    return (
      <div className="container mx-auto p-4 md:p-8 flex justify-center">
        <div className="card bg-base-100 w-full max-w-2xl shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h2 className="card-title text-3xl font-bold">{post.title}</h2>
            </div>

            <p className="text-lg leading-relaxed mt-4">{post.body}</p>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className=" mt-7 text-error text-5xl font-bold">404</div>
        <h1 className="text-2xl font-semibold text-base-content/70">
          ID Not Found
        </h1>
      </div>
    );
  }
}
