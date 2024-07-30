import { useState } from "react";
import TeamPopup from "./TeamPopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function TeamCard({ team }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{team.name}</h3>
      <p className="text-sm text-muted-foreground">
        Badge: {team.badge || "N/A"} | Home: {team.is_home ? "Yes" : "No"} |
      </p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editTeam/${team._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={team._id} endpoint={"teams"} />
        </button>
      </div>
      {isPopupOpen && (
        <TeamPopup team={team} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
