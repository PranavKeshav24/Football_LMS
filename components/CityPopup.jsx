// components/CityPopup.jsx
import React from "react";
import { XIcon } from "./Icons"; // Adjust the path as necessary

const CityPopup = ({ city, onClose }) => {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white text-black rounded-2xl shadow-lg w-full max-w-md p-6 border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{city.name}</h2>
          <button onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Code</span>
            <span className="font-bold">{city.code}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Province</span>
            <span className="font-bold">{city.province || "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">State</span>
            <span className="font-bold">{city.state || "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Country</span>
            <span className="font-bold">{city.country}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Created At</span>
            <span className="font-bold">
              {new Date(city.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Updated At</span>
            <span className="font-bold">
              {new Date(city.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPopup;
