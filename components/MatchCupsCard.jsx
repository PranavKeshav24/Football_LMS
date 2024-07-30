"use client";
import { useState } from "react";
import MatchCupsPopup from "./MatchCupsPopup"; // Adjust the path as necessary
import { HiOutlineEye, HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn"; // Adjust the path as necessary

export default function MatchCupsCard({ matchCup }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{matchCup.competition_name}</h3>
      <p className="text-sm text-muted-foreground">
        Edition: {matchCup.edition} - Round: {matchCup.round}
      </p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editMatchCup/${matchCup._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={matchCup._id} endpoint={"matchCup"} />
        </button>
      </div>
      {isPopupOpen && (
        <MatchCupsPopup
          matchCup={matchCup}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}
