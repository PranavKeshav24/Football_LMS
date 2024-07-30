import { useState } from "react";
import StadiumPopup from "./StadiumPopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function StadiumCard({ stadium }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{stadium.name}</h3>
      <p className="text-sm text-muted-foreground">
        Code: {stadium.code} | City: {stadium.city?.name || "N/A"}
      </p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editStadium/${stadium._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={stadium._id} endpoint={"stadiums"} />
        </button>
      </div>
      {isPopupOpen && (
        <StadiumPopup stadium={stadium} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
