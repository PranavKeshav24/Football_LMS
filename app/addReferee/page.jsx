"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddReferee() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code) {
      alert("Name and Code are required.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/referee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, code }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the home page or any other desired page
      } else {
        throw new Error("Failed to add referee");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="font-bold" htmlFor="name">
        Referee Name:
      </label>
      <input
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Referee Name"
      />

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

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Referee
      </button>
    </form>
  );
}
