"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddPlayerForm() {
  const [sportsmen, setSportsmen] = useState([]);
  const [selectedSportsman, setSelectedSportsman] = useState("");
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [home, setHome] = useState(false);
  const [starts, setStarts] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [subMin, setSubMin] = useState(0);
  const [yellow1, setYellow1] = useState(0);
  const [yellow2, setYellow2] = useState(0);
  const [red, setRed] = useState(0);

  const router = useRouter();

  useEffect(() => {
    async function fetchSportsmen() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/sportsman`);
        const data = await res.json();
        console.log("Fetched sportsmen:", data.sportsmen); // Log fetched data
        setSportsmen(data.sportsmen);
      } catch (error) {
        console.error("Failed to fetch sportsmen:", error);
      }
    }

    fetchSportsmen();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSportsman || !team || !position || starts < 0 || minutes < 0) {
      alert(
        "Please fill in all required fields and ensure no negative values for starts and minutes."
      );
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/players`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          sportsman: selectedSportsman,
          team,
          position,
          home,
          starts,
          minutes,
          sub_min: subMin,
          yellow_1: yellow1,
          yellow_2: yellow2,
          red,
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add player");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select
        onChange={(e) => setSelectedSportsman(e.target.value)}
        value={selectedSportsman}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="" disabled>
          Select a sportsman
        </option>
        {sportsmen.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name} {s.surname_1} {s.surname_2} ({s.football_name})
          </option>
        ))}
      </select>

      <input
        onChange={(e) => setTeam(e.target.value)}
        value={team}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Team ID"
      />

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
        Add Player
      </button>
    </form>
  );
}
//60d21b4667d0d8992e610c86
