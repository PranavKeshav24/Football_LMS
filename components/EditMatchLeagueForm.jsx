"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditMatchLeagueForm({
  id,
  competitionName,
  tier,
  group,
  week,
}) {
  const [newCompetitionName, setNewCompetitionName] = useState(competitionName);
  const [newTier, setNewTier] = useState(tier);
  const [newGroup, setNewGroup] = useState(group);
  const [newWeek, setNewWeek] = useState(week);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/matchLeague/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          competition_name: newCompetitionName,
          tier: newTier,
          group: newGroup,
          week: newWeek,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update match league");
      }

      router.refresh();
      router.push("/");
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
        onChange={(e) => setNewCompetitionName(e.target.value)}
        value={newCompetitionName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Competition Name"
      />

      <label className="font-bold" htmlFor="tier">
        Tier:
      </label>
      <input
        id="tier"
        onChange={(e) => setNewTier(e.target.value)}
        value={newTier}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Tier"
      />

      <label className="font-bold" htmlFor="group">
        Group:
      </label>
      <input
        id="group"
        onChange={(e) => setNewGroup(e.target.value)}
        value={newGroup}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Group"
      />

      <label className="font-bold" htmlFor="week">
        Week:
      </label>
      <input
        id="week"
        onChange={(e) => setNewWeek(e.target.value)}
        value={newWeek}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Week"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Match League
      </button>
    </form>
  );
}
