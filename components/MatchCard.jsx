import { useState } from "react";
import MatchPopup from "./MatchPopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function MatchCard({ match }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Destructure match object for easier access
  const {
    home_team,
    away_team,
    date,
    goals_home,
    goals_away,
    referee,
    stadium,
    league,
    cup,
  } = match;

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">
        {home_team?.name || "Unknown Team"} vs{" "}
        {away_team?.name || "Unknown Team"}
      </h3>
      <p className="text-sm text-muted-foreground">
        Date: {new Date(date).toLocaleDateString()}
      </p>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Goals</span>
          <span className="font-bold">
            {goals_home} - {goals_away}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Referee</span>
          <span className="font-bold">
            {referee?.name || "Unknown Referee"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Stadium</span>
          <span className="font-bold">
            {stadium?.name || "Unknown Stadium"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">League</span>
          <span className="font-bold">{league?.name || "Unknown League"}</span>
        </div>
        {cup && (
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Cup</span>
            <span className="font-bold">{cup?.name || "Unknown Cup"}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editMatch/${match._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={match._id} endpoint={"matches"} />
        </button>
      </div>
      {isPopupOpen && (
        <MatchPopup match={match} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
