import React from "react";
import { XIcon } from "./Icons"; // Adjust the path as necessary

const StadiumPopup = ({ stadium, onClose }) => {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-card text-card-foreground rounded-2xl shadow-lg w-full max-w-md p-6 border-2 border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{stadium.name}</h2>
          <button onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Code</span>
            <span className="font-bold">{stadium.code || "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">City</span>
            <span className="font-bold">{stadium.city?.name || "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Created At</span>
            <span className="font-bold">
              {new Date(stadium.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Updated At</span>
            <span className="font-bold">
              {new Date(stadium.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumPopup;
