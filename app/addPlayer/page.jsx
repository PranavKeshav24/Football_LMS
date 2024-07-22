"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPlayer() {
  const [sportsman, setSportsman] = useState("");
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [home, setHome] = useState(true);
  const [starts, setStarts] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [subMin, setSubMin] = useState(0);
  const [yellow1, setYellow1] = useState(0);
  const [yellow2, setYellow2] = useState(0);
  const [red, setRed] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sportsman || !team || !position || starts < 0 || minutes < 0) {
      alert(
        "Please fill in all required fields and ensure no negative values for starts and minutes."
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/players", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          sportsman,
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
        throw new Error("Failed to create a player");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="font-bold">Sportsman ID:</span>
        <input
          onChange={(e) => setSportsman(e.target.value)}
          value={sportsman}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Sportsman ID"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Team ID:</span>
        <input
          onChange={(e) => setTeam(e.target.value)}
          value={team}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Team ID"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Position:</span>
        <input
          onChange={(e) => setPosition(e.target.value)}
          value={position}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Position"
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          onChange={(e) => setHome(e.target.checked)}
          checked={home}
          className="border border-slate-500"
          type="checkbox"
        />
        <span className="font-bold">Home:</span>
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Starts (0 or more):</span>
        <input
          onChange={(e) => setStarts(e.target.value)}
          value={starts}
          className="border border-slate-500 px-8 py-2"
          type="number"
          placeholder="Starts"
          min="0"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Minutes (0 or more):</span>
        <input
          onChange={(e) => setMinutes(e.target.value)}
          value={minutes}
          className="border border-slate-500 px-8 py-2"
          type="number"
          placeholder="Minutes"
          min="0"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Sub Minutes (optional):</span>
        <input
          onChange={(e) => setSubMin(e.target.value)}
          value={subMin}
          className="border border-slate-500 px-8 py-2"
          type="number"
          placeholder="Sub Minutes"
          min="0"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Yellow Cards 1 (optional):</span>
        <input
          onChange={(e) => setYellow1(e.target.value)}
          value={yellow1}
          className="border border-slate-500 px-8 py-2"
          type="number"
          placeholder="Yellow 1"
          min="0"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Yellow Cards 2 (optional):</span>
        <input
          onChange={(e) => setYellow2(e.target.value)}
          value={yellow2}
          className="border border-slate-500 px-8 py-2"
          type="number"
          placeholder="Yellow 2"
          min="0"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-bold">Red Cards (optional):</span>
        <input
          onChange={(e) => setRed(e.target.value)}
          value={red}
          className="border border-slate-500 px-8 py-2"
          type="number"
          placeholder="Red"
          min="0"
        />
      </label>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Player
      </button>
    </form>
  );
}
