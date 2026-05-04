"use client";

import { useFormStatus } from "react-dom";

export default function SendBtn({ text }: { text: string }) {
   const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="border w-full p-2 bg-blue-400 text-white disabled:bg-gray-300"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
