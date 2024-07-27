"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddManager() {
  const [sportsmen, setSportsmen] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedSportsman, setSelectedSportsman] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const sportsmenRes = await fetch(`${apiUrl}/api/sportsman`);
        const sportsmenData = await sportsmenRes.json();
        setSportsmen(sportsmenData.sportsmen);

        const teamsRes = await fetch(`${apiUrl}/api/team`);
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/manager`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sportsman: selectedSportsman,
          team: selectedTeam,
        }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the home page or any other desired page
      } else {
        throw new Error("Failed to add manager");
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
        <option value="">Select Sportsman</option>
        {sportsmen.map((sportsman) => (
          <option key={sportsman._id} value={sportsman._id}>
            {sportsman.name} {sportsman.surname_1} {sportsman.surname_2}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedTeam(e.target.value)}
        value={selectedTeam}
        className="border border-slate-500 px-8 py-2"
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
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Manager
      </button>
    </form>
  );
}
