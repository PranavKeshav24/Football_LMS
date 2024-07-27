"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMatch() {
  const [teams, setTeams] = useState([]);
  const [referees, setReferees] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [cups, setCups] = useState([]);

  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [selectedReferee, setSelectedReferee] = useState("");
  const [selectedStadium, setSelectedStadium] = useState("");
  const [selectedCup, setSelectedCup] = useState("");

  const [date, setDate] = useState("");
  const [goalsHome, setGoalsHome] = useState("");
  const [goalsAway, setGoalsAway] = useState("");
  const [observations, setObservations] = useState("");
  const [chronicle, setChronicle] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const res = await fetch(`${apiUrl}/api/team`);
        if (!res.ok) {
          throw new Error("Failed to fetch teams");
        }
        const data = await res.json();
        setTeams(data.teams || []);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeams([]);
      }
    };

    const fetchReferees = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/referee`);
        if (!res.ok) {
          throw new Error("Failed to fetch referees");
        }
        const data = await res.json();
        setReferees(data.referees || []);
      } catch (error) {
        console.error("Error fetching referees:", error);
        setReferees([]);
      }
    };

    const fetchStadiums = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/stadium`);
        if (!res.ok) {
          throw new Error("Failed to fetch stadiums");
        }
        const data = await res.json();
        setStadiums(data.stadiums || []);
      } catch (error) {
        console.error("Error fetching stadiums:", error);
        setStadiums([]);
      }
    };

    const fetchCups = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/matchCup`);
        if (!res.ok) {
          throw new Error("Failed to fetch cups");
        }
        const data = await res.json();
        setCups(data.cups || []);
      } catch (error) {
        console.error("Error fetching cups:", error);
        setCups([]);
      }
    };

    fetchTeams();
    fetchReferees();
    fetchStadiums();
    fetchCups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedHomeTeam === selectedAwayTeam) {
      alert("Home team and away team cannot be the same.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          goals_home: goalsHome,
          goals_away: goalsAway,
          observations,
          chronicle,
          referee: selectedReferee,
          home_team: selectedHomeTeam,
          away_team: selectedAwayTeam,
          stadium: selectedStadium,
          league: selectedLeague,
          cup: selectedCup,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add match");
      }

      router.push("/"); // Redirect to the home page or any other desired page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="date" className="font-bold">
        Date:
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      />

      <label htmlFor="goalsHome" className="font-bold">
        Goals Home:
      </label>
      <input
        id="goalsHome"
        type="number"
        value={goalsHome}
        onChange={(e) => setGoalsHome(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      />

      <label htmlFor="goalsAway" className="font-bold">
        Goals Away:
      </label>
      <input
        id="goalsAway"
        type="number"
        value={goalsAway}
        onChange={(e) => setGoalsAway(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      />

      <label htmlFor="observations" className="font-bold">
        Observations:
      </label>
      <textarea
        id="observations"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      />

      <label htmlFor="chronicle" className="font-bold">
        Chronicle:
      </label>
      <textarea
        id="chronicle"
        value={chronicle}
        onChange={(e) => setChronicle(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      />

      <label htmlFor="homeTeam" className="font-bold">
        Home Team:
      </label>
      <select
        id="homeTeam"
        value={selectedHomeTeam}
        onChange={(e) => setSelectedHomeTeam(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      >
        <option value="">Select Home Team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      <label htmlFor="awayTeam" className="font-bold">
        Away Team:
      </label>
      <select
        id="awayTeam"
        value={selectedAwayTeam}
        onChange={(e) => setSelectedAwayTeam(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      >
        <option value="">Select Away Team</option>
        {teams
          .filter((team) => team._id !== selectedHomeTeam) // Filter out the selected home team
          .map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
      </select>

      <label htmlFor="referee" className="font-bold">
        Referee:
      </label>
      <select
        id="referee"
        value={selectedReferee}
        onChange={(e) => setSelectedReferee(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      >
        <option value="">Select Referee</option>
        {referees.map((referee) => (
          <option key={referee._id} value={referee._id}>
            {referee.name}
          </option>
        ))}
      </select>

      <label htmlFor="stadium" className="font-bold">
        Stadium:
      </label>
      <select
        id="stadium"
        value={selectedStadium}
        onChange={(e) => setSelectedStadium(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      >
        <option value="">Select Stadium</option>
        {stadiums.map((stadium) => (
          <option key={stadium._id} value={stadium._id}>
            {stadium.name}
          </option>
        ))}
      </select>

      <label htmlFor="cup" className="font-bold">
        Cup:
      </label>
      <select
        id="cup"
        value={selectedCup}
        onChange={(e) => setSelectedCup(e.target.value)}
        className="border border-slate-500 px-4 py-2"
      >
        <option value="">Select Cup</option>
        {cups.map((cup) => (
          <option key={cup._id} value={cup._id}>
            {cup.competition_name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Match
      </button>
    </form>
  );
}
