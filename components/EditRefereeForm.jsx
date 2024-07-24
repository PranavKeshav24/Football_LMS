"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditRefereeForm({ id, name, code }) {
  const [newName, setNewName] = useState(name);
  const [newCode, setNewCode] = useState(code);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/referee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          code: newCode,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update referee");
      }

      router.refresh();
      router.push("/"); // Redirect to the desired page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Referee Name"
      />

      <input
        onChange={(e) => setNewCode(e.target.value)}
        value={newCode}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Referee Code"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Referee
      </button>
    </form>
  );
}
