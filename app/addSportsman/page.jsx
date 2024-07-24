"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSportsman() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [surname1, setSurname1] = useState("");
  const [surname2, setSurname2] = useState("");
  const [footballName, setFootballName] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !name || !surname1 || !surname2 || !footballName) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/sportsman", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code, name, surname1, surname2, footballName }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add sportsman");
      }
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
        onChange={(e) => setCode(e.target.value)}
        value={code}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Code"
      />

      <label className="font-bold" htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Name"
      />

      <label className="font-bold" htmlFor="surname1">
        Surname 1:
      </label>
      <input
        id="surname1"
        onChange={(e) => setSurname1(e.target.value)}
        value={surname1}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Surname 1"
      />

      <label className="font-bold" htmlFor="surname2">
        Surname 2:
      </label>
      <input
        id="surname2"
        onChange={(e) => setSurname2(e.target.value)}
        value={surname2}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Surname 2"
      />

      <label className="font-bold" htmlFor="footballName">
        Football Name:
      </label>
      <input
        id="footballName"
        onChange={(e) => setFootballName(e.target.value)}
        value={footballName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Football Name"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Sportsman
      </button>
    </form>
  );
}
