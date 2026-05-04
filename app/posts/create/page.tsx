import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SendBtn from "@/components/sendbtn";

export default function CreatePostPage() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");

    await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/posts");
    redirect("/posts");
  }
  
  return (
    <div className="border m-5 p-5">
      <h1 className="text-xl font-bold mb-4">Create Post</h1>
      <form action={createPost}>
        <div className="mb-4">
          <input
            name="title"
            type="text"
            placeholder="title"
             className="input border w-full p-2"
          />
        </div>

        <div className="mb-4">
          <input
            name="content"
            type="text"
            placeholder="conttent"
             className="input border w-full p-2"
          />
        </div>

        <SendBtn text="Send Post" />
      </form>
    </div>
  );
}
