"use client";

import { useState } from "react";
import { addRequest } from "@/api/request.api";

export default function RequestForm() {
  const [type, setType] = useState<"question" | "feature">("question");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const submit = async () => {
    await addRequest({ type, title, description });
    setTitle("");
    setDescription("");
    alert("Request submitted");
  };

  return (
    <div className="border p-4 rounded space-y-2">
      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value as "question" | "feature")
        }
      >
        <option value="question">Question</option>
        <option value="feature">Feature</option>
      </select>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your request"
        className="w-full border p-2"
        rows={3}
      />

      <button onClick={submit} className="underline text-sm">
        Submit
      </button>
    </div>
  );
}
