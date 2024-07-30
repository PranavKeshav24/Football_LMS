"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMatchCup() {
  const [competitionName, setCompetitionName] = useState("");
  const [edition, setEdition] = useState("");
  const [round, setRound] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!competitionName) {
      alert("Competition Name is required.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/matchCup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competition_name: competitionName,
          edition,
          round,
        }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the match cups list page
      } else {
        throw new Error("Failed to add match cup");
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

      <label className="font-bold" htmlFor="edition">
        Edition:
      </label>
      <input
        id="edition"
        onChange={(e) => setEdition(e.target.value)}
        value={edition}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Edition"
      />

      <label className="font-bold" htmlFor="round">
        Round:
      </label>
      <input
        id="round"
        onChange={(e) => setRound(e.target.value)}
        value={round}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Round"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Match Cup
      </button>
    </form>
  );
}
