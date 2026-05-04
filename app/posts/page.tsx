import Link from "next/link";
 
interface Post {
  _id: number;
  title: string;
  content: string;
  createdAt : string;
  updatedAt : string;
}

export default async function page() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/notes/",
      // "https://dummyjson.com/posts?select=title,id",
      {
        cache: "no-store",
      },
    );

    const DataPosts: Post[] = await response.json();
    console.log(DataPosts);

    return (
      <div>
        <ul>
          {DataPosts.map((post) => (
            <li key={post._id}>
              <Link href={`/posts/${post._id}`}>
                <h2>{post._id}</h2>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.createdAt}</p>
                <p>{post.updatedAt}</p>
                <hr />
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
