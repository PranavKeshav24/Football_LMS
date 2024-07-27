import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const fetchSportsmanById = async (id) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/sportsman/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sportsman");
    }

    const data = await res.json();
    return data.sportsman || {};
  } catch (error) {
    console.error("Error fetching sportsman: ", error);
    return {};
  }
};

const getPlayers = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/players`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch players");
    }

    const data = await res.json();
    const players = data.Players || [];

    // Fetch sportsman details for each player
    const playersWithSportsmanDetails = await Promise.all(
      players.map(async (player) => {
        const sportsman = await fetchSportsmanById(player.sportsman);
        return { ...player, sportsman };
      })
    );

    return { players: playersWithSportsmanDetails };
  } catch (error) {
    console.error("Error loading players: ", error);
    return { players: [] };
  }
};

export default async function PlayersList() {
  const { players } = await getPlayers();

  if (!players || players.length === 0) {
    return <div>No players found.</div>;
  }

  return (
    <div className="space-y-4">
      {players.map((p) => (
        <div
          key={p._id}
          className="p-4 border text-black border-slate-300 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{p.sportsman?.name || "N/A"}</h2>
            <div>Team: {p.team || "N/A"}</div>
            <div>Position: {p.position || "N/A"}</div>
            <div>Home: {p.home ? "Yes" : "No"}</div>
            <div>Starts: {p.starts || "N/A"}</div>
            <div>Minutes: {p.minutes || "N/A"}</div>
            <div>Sub Minutes: {p.sub_min || "N/A"}</div>
            <div>Yellow Cards: {p.yellow_1 || "N/A"}</div>
            <div>Second Yellow Cards: {p.yellow_2 || "N/A"}</div>
            <div>Red Cards: {p.red || "N/A"}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={p._id} />
            <Link href={`/editPlayer/${p._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
