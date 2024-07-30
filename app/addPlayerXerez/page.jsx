"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddPlayerXerezForm() {
  const [sportsman, setSportsman] = useState("");
  const [position, setPosition] = useState("");
  const [numMatches, setNumMatches] = useState("");
  const [goals, setGoals] = useState("");
  const [minPlayed, setMinPlayed] = useState("");
  const [yellows, setYellows] = useState("");
  const [reds, setReds] = useState("");
  const [comment, setComment] = useState("");
  const [pic, setPic] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [matWon, setMatWon] = useState("");
  const [matDraw, setMatDraw] = useState("");
  const [matLost, setMatLost] = useState("");
  const [sportsmenOptions, setSportsmenOptions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSportsmen = async () => {
      try {
        const res = await fetch(`${API_URL}/api/sportsman`);
        const data = await res.json();
        setSportsmenOptions(data.data || []);
      } catch (error) {
        console.error("Error fetching sportsmen:", error);
        setSportsmenOptions([]);
      }
    };

    fetchSportsmen();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/playerXerez`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sportsman,
          position,
          num_matches: numMatches,
          goals,
          min_played: minPlayed,
          yellows,
          reds,
          comment,
          pic,
          born_date: bornDate,
          death_date: deathDate,
          mat_won: matWon,
          mat_draw: matDraw,
          mat_lost: matLost,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add player");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select
        onChange={(e) => setSportsman(e.target.value)}
        value={sportsman}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Sportsman</option>
        {sportsmenOptions.length > 0 &&
          sportsmenOptions.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>

      <input
        onChange={(e) => setPosition(e.target.value)}
        value={position}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Position"
      />

      <input
        onChange={(e) => setNumMatches(e.target.value)}
        value={numMatches}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Number of Matches"
      />

      <input
        onChange={(e) => setGoals(e.target.value)}
        value={goals}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Goals"
      />

      <input
        onChange={(e) => setMinPlayed(e.target.value)}
        value={minPlayed}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Minutes Played"
      />

      <input
        onChange={(e) => setYellows(e.target.value)}
        value={yellows}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Yellow Cards"
      />

      <input
        onChange={(e) => setReds(e.target.value)}
        value={reds}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Red Cards"
      />

      <input
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Comment"
      />

      <input
        onChange={(e) => setPic(e.target.value)}
        value={pic}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Picture URL"
      />

      <input
        onChange={(e) => setBornDate(e.target.value)}
        value={bornDate}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Born Date"
      />

      <input
        onChange={(e) => setDeathDate(e.target.value)}
        value={deathDate}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Death Date"
      />

      <input
        onChange={(e) => setMatWon(e.target.value)}
        value={matWon}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Matches Won"
      />

      <input
        onChange={(e) => setMatDraw(e.target.value)}
        value={matDraw}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Matches Drawn"
      />

      <input
        onChange={(e) => setMatLost(e.target.value)}
        value={matLost}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Matches Lost"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Add PlayerXerez
      </button>
    </form>
  );
}
