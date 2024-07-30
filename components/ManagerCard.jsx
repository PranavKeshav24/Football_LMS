import { useState } from "react";
import ManagerPopup from "./ManagerPopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function ManagerCard({ manager }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{manager.sportsman.name}</h3>
      <p className="text-sm text-muted-foreground">
        {manager.sportsman.surname_1} {manager.sportsman.surname_2}
      </p>
      <p className="text-sm text-muted-foreground">
        Team: {manager.team ? manager.team.name : "N/A"}
      </p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editManager/${manager._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={manager._id} endpoint={"manager"} />
        </button>
      </div>
      {isPopupOpen && (
        <ManagerPopup manager={manager} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
