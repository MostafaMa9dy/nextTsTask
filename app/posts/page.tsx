import Link from "next/link";
import React from "react";

export default async function page() {
  try {
    const response = await fetch(
      "https://dummyjson.com/posts?select=title,id",
      {
        cache: "no-store",
      },
    );
 

    const DataPosts = await response.json();
    console.log(DataPosts);

    return (
      <div>
        <ul>
          {DataPosts.posts.map((post: any) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}> {post.title}</Link>
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
