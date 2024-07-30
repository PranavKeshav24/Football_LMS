import React from "react";
import { XIcon } from "./Icons"; // Adjust the path as necessary

const MatchPopup = ({ match, onClose }) => {
  // Destructure match object for easier access
  const {
    home_team,
    away_team,
    date,
    goals_home,
    goals_away,
    referee,
    stadium,
    league,
    cup,
    observations,
    chronicle,
    createdAt,
    updatedAt,
  } = match;

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-card text-card-foreground rounded-2xl shadow-lg w-full max-w-md p-6 border-2 border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {home_team?.name || "Unknown Team"} vs{" "}
            {away_team?.name || "Unknown Team"}
          </h2>
          <button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Date</span>
            <span className="font-bold">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Goals</span>
            <span className="font-bold">
              {goals_home} - {goals_away}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Referee</span>
            <span className="font-bold">
              {referee?.name || "Unknown Referee"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Stadium</span>
            <span className="font-bold">
              {stadium?.name || "Unknown Stadium"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">League</span>
            <span className="font-bold">
              {league?.name || "Unknown League"}
            </span>
          </div>
          {cup && (
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Cup</span>
              <span className="font-bold">{cup?.name || "Unknown Cup"}</span>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Observations</span>
            <span className="font-bold">
              {observations || "No Observations"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Chronicle</span>
            <span className="font-bold">{chronicle || "No Chronicle"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Created At</span>
            <span className="font-bold">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Updated At</span>
            <span className="font-bold">
              {new Date(updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPopup;
