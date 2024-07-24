"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTeamForm({ id, name, badge, isHome, isAway }) {
  const [newName, setNewName] = useState(name);
  const [newBadge, setNewBadge] = useState(badge);
  const [newIsHome, setNewIsHome] = useState(isHome);
  const [newIsAway, setNewIsAway] = useState(isAway);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/team/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          badge: newBadge,
          is_home: newIsHome,
          is_away: newIsAway,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update team");
      }

      router.refresh();
      router.push("/");
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
        placeholder="Team Name"
      />

      <input
        onChange={(e) => setNewBadge(e.target.value)}
        value={newBadge}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Team Badge URL"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={newIsHome}
          onChange={() => setNewIsHome(!newIsHome)}
        />
        Home Team
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={newIsAway}
          onChange={() => setNewIsAway(!newIsAway)}
        />
        Away Team
      </label>

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Team
      </button>
    </form>
  );
}
