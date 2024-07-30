import { useState, useEffect } from "react";
import RefereePopup from "./RefereePopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function RefereeCard({ referee }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{referee.name}</h3>
      <p className="text-sm text-muted-foreground">Code: {referee.code}</p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editReferee/${referee._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={referee._id} endpoint={"referees"} />
        </button>
      </div>
      {isPopupOpen && (
        <RefereePopup referee={referee} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
