"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditStadiumForm({ id, name, code, city }) {
  const [newName, setNewName] = useState(name);
  const [newCode, setNewCode] = useState(code);
  const [newCity, setNewCity] = useState(city);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/stadium/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          code: newCode,
          city: newCity, // Ensure this is a valid city ID
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update stadium");
      }

      router.refresh();
      router.push("/"); // Redirect to the home page or another page
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
        placeholder="Stadium Name"
      />

      <input
        onChange={(e) => setNewCode(e.target.value)}
        value={newCode}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Stadium Code"
      />

      <input
        onChange={(e) => setNewCity(e.target.value)}
        value={newCity}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="City ID"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Stadium
      </button>
    </form>
  );
}
