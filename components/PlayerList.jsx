import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getPlayers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/players", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch players");
    }

    const data = await res.json();
    console.log("Fetched players data: ", data); // Log the fetched data

    // Handle the 'Players' key in the API response
    return { players: data.Players || [] };
  } catch (error) {
    console.error("Error loading players: ", error);
    return { players: [] }; // Return an empty array in case of error
  }
};

export default async function PlayersList() {
  const { players } = await getPlayers();

  if (!players || players.length === 0) {
    return <div>No players found.</div>;
  }

  return (
    <>
      {players.map((p) => (
        <div
          key={p._id}
          className="p-4 border text-black border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{p.sportsman || "N/A"}</h2>
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
    </>
  );
}
