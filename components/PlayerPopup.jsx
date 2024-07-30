// components/PlayerPopup.jsx
import React from "react";
import { useState, useEffect } from "react";
import { XIcon } from "./Icons"; // Adjust the path as necessary

const fetchSportsmanById = async (id) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/sportsman/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sportsman");
    }

    const data = await res.json();
    return data.sportsman.name || "";
  } catch (error) {
    console.error("Error fetching sportsman: ", error);
    return "";
  }
};

const fetchTeamById = async (id) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/team/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch team");
    }

    const data = await res.json();
    return data.team.name || ""; // Changed 'data.teams' to 'data.team' assuming 'team' is the correct key
  } catch (error) {
    console.error("Error fetching team: ", error);
    return "";
  }
};

const PlayerPopup = ({ player, onClose }) => {
  const [sportsmanName, setSportsmanName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getSportsmanName = async () => {
      const name = await fetchSportsmanById(player.sportsman);
      setSportsmanName(name);
    };
    const getTeamName = async () => {
      const name = await fetchTeamById(player.team);
      setTeamName(name);
    };

    getSportsmanName();
    getTeamName();
  }, [player.sportsman, player.team]);
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-card text-card-foreground rounded-2xl shadow-lg w-full max-w-md p-6 border-2 border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{sportsmanName}</h2>
          <button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Position</span>
            <span className="font-bold">{player.position}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Team</span>
            <span className="font-bold">{teamName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Home</span>
            <span className="font-bold">{player.home ? "Yes" : "No"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Starts</span>
            <span className="font-bold">{player.starts}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Red Cards</span>
            <span className="font-bold">{player.red}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Yellow Cards (1st)</span>
            <span className="font-bold">{player.yellow_1}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Yellow Cards (2nd)</span>
            <span className="font-bold">{player.yellow_2}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Minutes Played</span>
            <span className="font-bold">{player.minutes}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Sub Minutes</span>
            <span className="font-bold">{player.sub_min}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Created At</span>
            <span className="font-bold">
              {new Date(player.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Updated At</span>
            <span className="font-bold">
              {new Date(player.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPopup;
