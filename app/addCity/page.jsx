"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCity() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [province, setProvince] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code || !country) {
      alert("Name, Code, and Country are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, code, province, state, country }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the home page or any other desired page
      } else {
        throw new Error("Failed to add city");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="City Name"
      />

      <input
        onChange={(e) => setCode(e.target.value)}
        value={code}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="City Code"
      />

      <input
        onChange={(e) => setProvince(e.target.value)}
        value={province}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Province"
      />

      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="State"
      />

      <input
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Country"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add City
      </button>
    </form>
  );
}
