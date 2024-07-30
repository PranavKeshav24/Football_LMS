import { useState, useEffect } from "react";
import PlayerPopup from "./PlayerPopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

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
    return data.sportsman.name || "";
  } catch (error) {
    console.error("Error fetching sportsman: ", error);
    return "";
  }
};

const fetchTeamById = async (id) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/team/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch team");
    }

    const data = await res.json();
    return data.team.name || ""; // Changed 'data.teams' to 'data.team' assuming 'team' is the correct key
  } catch (error) {
    console.error("Error fetching team: ", error);
    return "";
  }
};

export default function PlayerCard({ player }) {
  const [sportsmanName, setSportsmanName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getSportsmanName = async () => {
      const name = await fetchSportsmanById(player.sportsman);
      setSportsmanName(name);
    };
    const getTeamName = async () => {
      const name = await fetchTeamById(player.team);
      setTeamName(name);
    };

    getSportsmanName();
    getTeamName();
  }, [player.sportsman, player.team]);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{sportsmanName}</h3>
      <p className="text-sm text-muted-foreground">
        {player.position} - {teamName}
      </p>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Home</span>
          <span className="font-bold">{player.home ? "Yes" : "No"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Starts</span>
          <span className="font-bold">{player.starts}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Red Cards</span>
          <span className="font-bold">{player.red}</span>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editPlayer/${player._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={player._id} endpoint={"players"} />
        </button>
      </div>
      {isPopupOpen && (
        <PlayerPopup player={player} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
