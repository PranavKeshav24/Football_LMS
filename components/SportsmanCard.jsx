import { useState } from "react";
import SportsmanPopup from "./SportsmanPopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

const SportsmanCard = ({ sportsman }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{sportsman.name}</h3>
      <p className="text-sm text-muted-foreground">
        {sportsman.surname_1} {sportsman.surname_2}
      </p>
      <p className="text-sm text-muted-foreground">Code: {sportsman.code}</p>
      <p className="text-sm text-muted-foreground">
        Football Name: {sportsman.football_name}
      </p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)} className="">
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editSportsman/${sportsman._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <RemoveBtn id={sportsman._id} endpoint="sportsman" />
      </div>
      {isPopupOpen && (
        <SportsmanPopup
          sportsman={sportsman}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default SportsmanCard;
