"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditManagerForm({
  _id,
  sportsman: initialSportsman,
  team: initialTeam,
}) {
  const [sportsmen, setSportsmen] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedSportsman, setSelectedSportsman] = useState(initialSportsman);
  const [selectedTeam, setSelectedTeam] = useState(initialTeam);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sportsmenRes = await fetch("http://localhost:3000/api/sportsman");
        const sportsmenData = await sportsmenRes.json();
        setSportsmen(sportsmenData.sportsmen);

        const teamsRes = await fetch("http://localhost:3000/api/team");
        const teamsData = await teamsRes.json();
        setTeams(teamsData.teams);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/manager/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sportsman: selectedSportsman,
          team: selectedTeam,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update manager");
      }

      router.push("/"); // Redirect to the desired page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="sportsman" className="font-bold">
        Sportsman
      </label>
      <select
        id="sportsman"
        onChange={(e) => setSelectedSportsman(e.target.value)}
        value={selectedSportsman}
        className="border border-slate-500 px-4 py-2"
      >
        <option value="">Select Sportsman</option>
        {sportsmen.map((sportsman) => (
          <option key={sportsman._id} value={sportsman._id}>
            {sportsman.name} {sportsman.surname_1} {sportsman.surname_2}
          </option>
        ))}
      </select>

      <label htmlFor="team" className="font-bold">
        Team
      </label>
      <select
        id="team"
        onChange={(e) => setSelectedTeam(e.target.value)}
        value={selectedTeam}
        className="border border-slate-500 px-4 py-2"
      >
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit mt-4"
      >
        Update Manager
      </button>
    </form>
  );
}
