"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMatchLeague() {
  const [competitionName, setCompetitionName] = useState("");
  const [tier, setTier] = useState("");
  const [group, setGroup] = useState("");
  const [week, setWeek] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!competitionName || !tier) {
      alert("Competition name and tier are required.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/matchLeague`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competition_name: competitionName,
          tier,
          group,
          week,
        }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the home page or any other desired page
      } else {
        throw new Error("Failed to add match league");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="font-bold" htmlFor="competitionName">
        Competition Name:
      </label>
      <input
        id="competitionName"
        onChange={(e) => setCompetitionName(e.target.value)}
        value={competitionName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Competition Name"
      />

      <label className="font-bold" htmlFor="tier">
        Tier:
      </label>
      <input
        id="tier"
        onChange={(e) => setTier(e.target.value)}
        value={tier}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Tier"
      />

      <label className="font-bold" htmlFor="group">
        Group:
      </label>
      <input
        id="group"
        onChange={(e) => setGroup(e.target.value)}
        value={group}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Group"
      />

      <label className="font-bold" htmlFor="week">
        Week:
      </label>
      <input
        id="week"
        onChange={(e) => setWeek(e.target.value)}
        value={week}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Week"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Match League
      </button>
    </form>
  );
}
