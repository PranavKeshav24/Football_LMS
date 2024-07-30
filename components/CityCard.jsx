import { useState, useEffect } from "react";
import CityPopup from "./CityPopup"; // Adjust the path as necessary
import { HiOutlineEye } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

export default function CityCard({ city }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-bold">{city.name}</h3>
      <p className="text-sm text-muted-foreground">
        {city.province}, {city.state || "N/A"}, {city.country}
      </p>
      <div className="flex gap-2 items-center mt-2">
        <button onClick={() => setIsPopupOpen(true)}>
          <HiOutlineEye className="w-6 h-6" />
        </button>
        <Link href={`/editCity/${city._id}`}>
          <HiPencilAlt className="w-6 h-6" />
        </Link>
        <button>
          <RemoveBtn id={city._id} endpoint={"cities"} />
        </button>
      </div>
      {isPopupOpen && (
        <CityPopup city={city} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
}
