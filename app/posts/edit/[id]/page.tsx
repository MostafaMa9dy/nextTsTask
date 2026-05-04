import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SendBtn from "@/components/sendbtn";
import { Post } from "@/types/post";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) redirect("/posts");
  const post: Post = await response.json();

  async function updatePost(formData: FormData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");

    await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/posts");
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
  }

  return (
    <div className="border m-5 p-5">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>
      <form action={updatePost}>
        <div className="mb-4">
          <input
            name="title"
            type="text"
            placeholder="title"
            defaultValue={post.title}
            className="input border w-full p-2"
          />
        </div>

        <div className="mb-4">
          <input
            name="content"
            type="text"
            placeholder="conttent"
            defaultValue={post.content}
            className="input border w-full p-2"
          />
        </div>

        <SendBtn text="Update Post" />
      </form>
    </div>
  );
}
