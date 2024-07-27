"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditMatchCupForm({
  id,
  competitionName,
  edition,
  round,
}) {
  const [newCompetitionName, setNewCompetitionName] = useState(competitionName);
  const [newEdition, setNewEdition] = useState(edition);
  const [newRound, setNewRound] = useState(round);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/matchCup/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competition_name: newCompetitionName,
          edition: newEdition,
          round: newRound,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update match cup");
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
        onChange={(e) => setNewCompetitionName(e.target.value)}
        value={newCompetitionName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Competition Name"
      />

      <input
        onChange={(e) => setNewEdition(e.target.value)}
        value={newEdition}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Edition"
      />

      <input
        onChange={(e) => setNewRound(e.target.value)}
        value={newRound}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Round"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Match Cup
      </button>
    </form>
  );
}
