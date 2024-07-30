"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import RemoveBtn from "@/components/RemoveBtn";
import { HiPencilAlt, HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons"; // Adjust the path as necessary
import MatchCupsCard from "@/components/MatchCupsCard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchMatchCups = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/matchCup`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch match cups");
    }

    const data = await res.json();
    return data.matchCups;
  } catch (error) {
    console.log("Error loading match cups: ", error);
    return []; // Return an empty array in case of an error
  }
};

export default function MatchCupsList() {
  const [matchCups, setMatchCups] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "competition_name", order: "asc" });
  const [filter, setFilter] = useState({ round: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getMatchCups = async () => {
      const data = await fetchMatchCups();
      setMatchCups(data);
    };
    getMatchCups();
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
  const handleFilterRound = (round) => {
    setFilter({ round: round === "all" ? "all" : round });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredMatchCups = useMemo(() => {
    if (!Array.isArray(matchCups)) return [];
    return matchCups
      .filter((matchCup) =>
        matchCup.competition_name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((matchCup) =>
        filter.round === "all" ? true : matchCup.round === filter.round
      );
  }, [matchCups, search, filter]);

  const sortedMatchCups = useMemo(() => {
    return filteredMatchCups.sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.order === "asc" ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredMatchCups, sort]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search match cups..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addMatchCup"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Match Cup</span>
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
                    <label className="block mb-2">Round</label>
                    <select
                      value={filter.round}
                      onChange={(e) => handleFilterRound(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Rounds</option>
                      <option value="Round 1">Round 1</option>
                      <option value="Round 2">Round 2</option>
                      <option value="Round 3">Round 3</option>
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
                      <option value="competition_name">Competition Name</option>
                      <option value="edition">Edition</option>
                      <option value="round">Round</option>
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
          {sortedMatchCups.map((matchCup) => (
            <MatchCupsCard key={matchCup._id} matchCup={matchCup} />
          ))}
        </div>
      </main>
    </div>
  );
}
