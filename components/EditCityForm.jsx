"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCityForm({
  id,
  name,
  code,
  province,
  state,
  country,
}) {
  const [newName, setNewName] = useState(name);
  const [newCode, setNewCode] = useState(code);
  const [newProvince, setNewProvince] = useState(province || "");
  const [newState, setNewState] = useState(state || "");
  const [newCountry, setNewCountry] = useState(country);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/city/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          code: newCode,
          province: newProvince,
          state: newState,
          country: newCountry,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update city");
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
        placeholder="City Name"
      />

      <input
        onChange={(e) => setNewCode(e.target.value)}
        value={newCode}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="City Code"
      />

      <input
        onChange={(e) => setNewProvince(e.target.value)}
        value={newProvince}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Province"
      />

      <input
        onChange={(e) => setNewState(e.target.value)}
        value={newState}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="State"
      />

      <input
        onChange={(e) => setNewCountry(e.target.value)}
        value={newCountry}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Country"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update City
      </button>
    </form>
  );
}
