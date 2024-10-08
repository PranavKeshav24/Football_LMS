"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPlayerForm({
  id,
  sportsman: initialSportsman,
  team: initialTeam,
  position: initialPosition,
  home: initialHome,
  starts: initialStarts,
  minutes: initialMinutes,
  sub_min: initialSubMin,
  yellow_1: initialYellow1,
  yellow_2: initialYellow2,
  red: initialRed,
}) {
  const [sportsman, setSportsman] = useState(initialSportsman);
  const [team, setTeam] = useState(initialTeam);
  const [position, setPosition] = useState(initialPosition);
  const [home, setHome] = useState(initialHome);
  const [starts, setStarts] = useState(initialStarts);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [subMin, setSubMin] = useState(initialSubMin);
  const [yellow1, setYellow1] = useState(initialYellow1);
  const [yellow2, setYellow2] = useState(initialYellow2);
  const [red, setRed] = useState(initialRed);
  const [sportsmen, setSportsmen] = useState([]);
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  // Fetch sportsmen data
  useEffect(() => {
    const fetchSportsmen = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/sportsman`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch sportsmen");
        const { sportsmen } = await res.json();
        setSportsmen(sportsmen);
      } catch (error) {
        console.error("Error fetching sportsmen:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/team`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch teams");
        const { teams } = await res.json();
        setTeams(teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
    fetchSportsmen();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sportsman || !team || !position || starts < 0 || minutes < 0) {
      alert(
        "Please fill in all required fields and ensure no negative values for starts and minutes."
      );
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/players/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newSportsman: sportsman,
          newTeam: team,
          newPosition: position,
          newHome: home,
          newStarts: parseInt(starts, 10),
          newMinutes: parseInt(minutes, 10),
          newSub_min: subMin ? parseInt(subMin, 10) : null,
          newYellow_1: yellow1 ? parseInt(yellow1, 10) : null,
          newYellow_2: yellow2 ? parseInt(yellow2, 10) : null,
          newRed: red ? parseInt(red, 10) : null,
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to update player");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col">
        <span className="mb-1">Select Sportsman</span>
        <select
          value={sportsman}
          onChange={(e) => setSportsman(e.target.value)}
          className="border border-slate-500 px-8 py-2"
        >
          <option value="">Select a sportsman</option>
          {sportsmen.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} {s.surname_1} {s.surname_2}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="team" className="flex flex-col">
        <span className="mb-1">Team</span>
        <select
          id="team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="border border-slate-500 px-4 py-2"
        >
          <option value="">Select Team</option>
          {teams.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      <input
        onChange={(e) => setPosition(e.target.value)}
        value={position}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Position"
      />

      <label className="flex items-center gap-2">
        <input
          onChange={(e) => setHome(e.target.checked)}
          checked={home}
          className="border border-slate-500"
          type="checkbox"
        />
        Home
      </label>

      <input
        onChange={(e) => setStarts(e.target.value)}
        value={starts}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Starts"
      />

      <input
        onChange={(e) => setMinutes(e.target.value)}
        value={minutes}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Minutes"
      />

      <input
        onChange={(e) => setSubMin(e.target.value)}
        value={subMin}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Sub Minutes"
      />

      <input
        onChange={(e) => setYellow1(e.target.value)}
        value={yellow1}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Yellow 1"
      />

      <input
        onChange={(e) => setYellow2(e.target.value)}
        value={yellow2}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Yellow 2"
      />

      <input
        onChange={(e) => setRed(e.target.value)}
        value={red}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Red"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Player
      </button>
    </form>
  );
}
