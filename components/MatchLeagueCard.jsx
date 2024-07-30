import { useState } from "react";
import MatchLeaguePopup from "./MatchLeaguePopup"; // Adjust the path as necessary
import { HiOutlineEye, HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

const MatchLeagueCard = ({ matchLeague }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{matchLeague.competition_name}</h3>
      <p className="text-sm text-muted-foreground">
        Tier: {matchLeague.tier}, Group: {matchLeague.group || "N/A"}, Week:{" "}
        {matchLeague.week || "N/A"}
      </p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editMatchLeague/${matchLeague._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <RemoveBtn id={matchLeague._id} endpoint="matchLeague" />
      </div>
      {isPopupOpen && (
        <MatchLeaguePopup
          matchLeague={matchLeague}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default MatchLeagueCard;
