"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditSportsmanForm({
  id,
  code,
  name,
  surname1,
  surname2,
  footballName,
}) {
  const [newCode, setNewCode] = useState(code);
  const [newName, setNewName] = useState(name);
  const [newSurname1, setNewSurname1] = useState(surname1);
  const [newSurname2, setNewSurname2] = useState(surname2);
  const [newFootballName, setNewFootballName] = useState(footballName);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/players/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newCode,
          newName,
          newSurname1,
          newSurname2,
          newFootballName,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update sportsman");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="font-bold" htmlFor="code">
        Code:
      </label>
      <input
        id="code"
        onChange={(e) => setNewCode(e.target.value)}
        value={newCode}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Code"
      />

      <label className="font-bold" htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Name"
      />

      <label className="font-bold" htmlFor="surname1">
        Surname 1:
      </label>
      <input
        id="surname1"
        onChange={(e) => setNewSurname1(e.target.value)}
        value={newSurname1}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Surname 1"
      />

      <label className="font-bold" htmlFor="surname2">
        Surname 2:
      </label>
      <input
        id="surname2"
        onChange={(e) => setNewSurname2(e.target.value)}
        value={newSurname2}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Surname 2"
      />

      <label className="font-bold" htmlFor="footballName">
        Football Name:
      </label>
      <input
        id="footballName"
        onChange={(e) => setNewFootballName(e.target.value)}
        value={newFootballName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Football Name"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Sportsman
      </button>
    </form>
  );
}
