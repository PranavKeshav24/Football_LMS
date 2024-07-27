"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditMatchForm({
  id,
  date,
  goalsHome,
  goalsAway,
  observations,
  chronicle,
  referee,
  homeTeam,
  awayTeam,
  stadium,
  league,
  cup,
  referees,
  teams,
  stadiums,
  leagues,
  cups,
}) {
  const [matchDate, setMatchDate] = useState(date);
  const [goalsHomeState, setGoalsHomeState] = useState(goalsHome);
  const [goalsAwayState, setGoalsAwayState] = useState(goalsAway);
  const [observationsState, setObservationsState] = useState(
    observations || ""
  );
  const [chronicleState, setChronicleState] = useState(chronicle || "");
  const [refereeState, setRefereeState] = useState(referee || "");
  const [homeTeamState, setHomeTeamState] = useState(homeTeam || "");
  const [awayTeamState, setAwayTeamState] = useState(awayTeam || "");
  const [stadiumState, setStadiumState] = useState(stadium || "");
  const [leagueState, setLeagueState] = useState(league || "");
  const [cupState, setCupState] = useState(cup || "");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/match/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: matchDate,
          goals_home: goalsHomeState,
          goals_away: goalsAwayState,
          observations: observationsState,
          chronicle: chronicleState,
          referee: refereeState,
          home_team: homeTeamState,
          away_team: awayTeamState,
          stadium: stadiumState,
          league: leagueState,
          cup: cupState,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update match");
      }

      router.refresh();
      router.push("/"); // Redirect to the desired page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="font-bold" htmlFor="date">
        Match Date:
      </label>
      <input
        id="date"
        type="datetime-local"
        value={matchDate}
        onChange={(e) => setMatchDate(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      />

      <label className="font-bold" htmlFor="goalsHome">
        Goals Home:
      </label>
      <input
        id="goalsHome"
        type="number"
        value={goalsHomeState}
        onChange={(e) => setGoalsHomeState(Number(e.target.value))}
        className="border border-slate-500 px-8 py-2"
      />

      <label className="font-bold" htmlFor="goalsAway">
        Goals Away:
      </label>
      <input
        id="goalsAway"
        type="number"
        value={goalsAwayState}
        onChange={(e) => setGoalsAwayState(Number(e.target.value))}
        className="border border-slate-500 px-8 py-2"
      />

      <label className="font-bold" htmlFor="observations">
        Observations:
      </label>
      <textarea
        id="observations"
        value={observationsState}
        onChange={(e) => setObservationsState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      />

      <label className="font-bold" htmlFor="chronicle">
        Chronicle:
      </label>
      <textarea
        id="chronicle"
        value={chronicleState}
        onChange={(e) => setChronicleState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      />

      <label className="font-bold" htmlFor="referee">
        Referee:
      </label>
      <select
        id="referee"
        value={refereeState}
        onChange={(e) => setRefereeState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Referee</option>
        {referees.map((ref) => (
          <option key={ref._id} value={ref._id}>
            {ref.name}
          </option>
        ))}
      </select>

      <label className="font-bold" htmlFor="homeTeam">
        Home Team:
      </label>
      <select
        id="homeTeam"
        value={homeTeamState}
        onChange={(e) => setHomeTeamState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Home Team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      <label className="font-bold" htmlFor="awayTeam">
        Away Team:
      </label>
      <select
        id="awayTeam"
        value={awayTeamState}
        onChange={(e) => setAwayTeamState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Away Team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      <label className="font-bold" htmlFor="stadium">
        Stadium:
      </label>
      <select
        id="stadium"
        value={stadiumState}
        onChange={(e) => setStadiumState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Stadium</option>
        {stadiums.map((stadium) => (
          <option key={stadium._id} value={stadium._id}>
            {stadium.name}
          </option>
        ))}
      </select>

      <label className="font-bold" htmlFor="league">
        League:
      </label>
      <select
        id="league"
        value={leagueState}
        onChange={(e) => setLeagueState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select League</option>
        {leagues.map((league) => (
          <option key={league._id} value={league._id}>
            {league.name}
          </option>
        ))}
      </select>

      <label className="font-bold" htmlFor="cup">
        Cup:
      </label>
      <select
        id="cup"
        value={cupState}
        onChange={(e) => setCupState(e.target.value)}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Cup</option>
        {cups.map((cup) => (
          <option key={cup._id} value={cup._id}>
            {cup.name}
          </option>
        ))}
      </select>

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Match
      </button>
    </form>
  );
}
