"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTeam() {
  const [name, setName] = useState("");
  const [badge, setBadge] = useState("");
  const [isHome, setIsHome] = useState(false);
  const [isAway, setIsAway] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !badge) {
      alert("Name and Badge are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, badge, is_home: isHome, is_away: isAway }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the home page or any other desired page
      } else {
        throw new Error("Failed to add team");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="font-bold" htmlFor="name">
        Team Name:
      </label>
      <input
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Team Name"
      />

      <label className="font-bold" htmlFor="badge">
        Badge:
      </label>
      <input
        id="badge"
        onChange={(e) => setBadge(e.target.value)}
        value={badge}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Badge"
      />

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="teamType"
          id="homeTeam"
          checked={isHome}
          onChange={() => setIsHome(true)}
          className="form-radio"
        />
        <span>Home Team</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="teamType"
          id="awayTeam"
          checked={isAway}
          onChange={() => setIsAway(true)}
          className="form-radio"
        />
        <span>Away Team</span>
      </label>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Team
      </button>
    </form>
  );
}
