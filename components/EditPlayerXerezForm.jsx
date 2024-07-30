import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditPlayerXerezForm({ playerXerez, onSubmit }) {
  const [sportsman, setSportsman] = useState(playerXerez.sportsman._id);
  const [position, setPosition] = useState(playerXerez.position);
  const [numMatches, setNumMatches] = useState(playerXerez.num_matches);
  const [goals, setGoals] = useState(playerXerez.goals);
  const [minPlayed, setMinPlayed] = useState(playerXerez.min_played);
  const [yellows, setYellows] = useState(playerXerez.yellows);
  const [reds, setReds] = useState(playerXerez.reds);
  const [comment, setComment] = useState(playerXerez.comment);
  const [pic, setPic] = useState(playerXerez.pic);
  const [bornDate, setBornDate] = useState(playerXerez.born_date);
  const [deathDate, setDeathDate] = useState(playerXerez.death_date);
  const [matWon, setMatWon] = useState(playerXerez.mat_won);
  const [matDraw, setMatDraw] = useState(playerXerez.mat_draw);
  const [matLost, setMatLost] = useState(playerXerez.mat_lost);
  const [sportsmenOptions, setSportsmenOptions] = useState([]);

  useEffect(() => {
    const fetchSportsmen = async () => {
      try {
        const res = await fetch(`${API_URL}/api/sportsman`);
        const data = await res.json();
        setSportsmenOptions(data.data);
      } catch (error) {
        console.error("Error fetching sportsmen:", error);
      }
    };

    fetchSportsmen();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
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
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select
        onChange={(e) => setSportsman(e.target.value)}
        value={sportsman}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select Sportsman</option>
        {sportsmenOptions.map((option) => (
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
        onChange={(e) => setNewMatDraw(e.target.value)}
        value={matDraw}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Matches Drawn"
      />

      <input
        onChange={(e) => setNewMatLost(e.target.value)}
        value={matLost}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Matches Lost"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update PlayerXerez
      </button>
    </form>
  );
}
