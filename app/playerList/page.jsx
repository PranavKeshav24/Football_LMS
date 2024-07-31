"use client";

import { useState, useMemo, useEffect } from "react";
import PlayerCard from "@/components/PlayerCard";
import { HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // replace with your API URL

const fetchPlayers = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/players`, {
      cache: "no-store",
    });
    const data = await res.json();
    console.log("Fetched data:", data); // Log the entire response
    if (Array.isArray(data.Players)) {
      return data.Players;
    } else {
      console.error("Fetched data is not an array", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  const [filter, setFilter] = useState({ position: "all", team: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getPlayers = async () => {
      const data = await fetchPlayers();
      setPlayers(data);
    };
    getPlayers();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
    setIsSortMenuOpen(false); // Close the sort menu after selection
  };
  const handleFilterPosition = (position) => {
    setFilter({
      position: position === "all" ? "all" : position.toLowerCase(),
    });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };
  const handleFilterTeam = (team) => {
    setFilter({ team: team === "all" ? "all" : team });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredPlayers = useMemo(() => {
    if (!Array.isArray(players)) return [];
    console.log("Filtering players:", players); // Log the players before filtering
    return players
      .filter(
        (player) =>
          player.name &&
          player.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((player) =>
        filter.position === "all" ? true : player.position === filter.position
      )
      .filter((player) =>
        filter.team === "all" ? true : player.team === filter.team
      );
  }, [players, search, sort, filter]);

  console.log("Filtered players:", filteredPlayers); // Log the filtered players

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addPlayer"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Player</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="flex items-center gap-2 p-2 border rounded"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                <FilterIcon className="w-5 h-5" />
                <span>Filter</span>
              </button>
              {isFilterMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                  <div className="p-2">
                    <label className="block mb-2">Position</label>
                    <select
                      value={filter.position}
                      onChange={(e) => handleFilterPosition(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Positions</option>
                      <option value="forward">Forward</option>
                      <option value="midfielder">Midfielder</option>
                      <option value="defender">Defender</option>
                    </select>
                  </div>
                  <div className="p-2">
                    <label className="block mb-2">Team</label>
                    <select
                      value={filter.team}
                      onChange={(e) => handleFilterTeam(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Teams</option>
                      <option value="barcelona">Barcelona</option>
                      <option value="juventus">Juventus</option>
                      <option value="liverpool">Liverpool</option>
                      <option value="manchester-city">Manchester City</option>
                      <option value="paris-saint-germain">
                        Paris Saint-Germain
                      </option>
                      <option value="bayern-munich">Bayern Munich</option>
                      <option value="real-madrid">Real Madrid</option>
                      <option value="chelsea">Chelsea</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center gap-2 p-2 border rounded"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                <ListOrderedIcon className="w-5 h-5" />
                <span>Sort</span>
              </button>
              {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                  <div className="p-2">
                    <label className="block mb-2">Sort by</label>
                    <select
                      value={sort.key}
                      onChange={(e) => handleSort(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="name">Name</option>
                      <option value="goals">Goals</option>
                      <option value="assists">Assists</option>
                      <option value="cleanSheets">Clean Sheets</option>
                    </select>
                  </div>
                  <div className="p-2">
                    <label className="block mb-2">Order</label>
                    <select
                      value={sort.order}
                      onChange={(e) =>
                        setSort({ ...sort, order: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </main>
    </div>
  );
}
