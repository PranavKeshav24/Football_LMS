"use client";

import { useState, useMemo, useEffect } from "react";
import TeamCard from "@/components/TeamCard";
import { HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // replace with your API URL

const fetchTeams = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/team`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data.teams)) {
      return data.teams;
    } else {
      console.error("Fetched data is not an array", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
};

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  const [filter, setFilter] = useState({ badge: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getTeams = async () => {
      const data = await fetchTeams();
      setTeams(data);
    };
    getTeams();
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
  const handleFilterBadge = (badge) => {
    setFilter({ badge: badge === "all" ? "all" : badge });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredTeams = useMemo(() => {
    if (!Array.isArray(teams)) return [];
    return teams
      .filter(
        (team) =>
          team.name && team.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((team) =>
        filter.badge === "all" ? true : team.badge === filter.badge
      );
  }, [teams, search, filter]);

  const sortedTeams = useMemo(() => {
    return filteredTeams.sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.order === "asc" ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTeams, sort]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search teams..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addTeam"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Team</span>
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
                    <label className="block mb-2">Badge</label>
                    <select
                      value={filter.badge}
                      onChange={(e) => handleFilterBadge(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Badges</option>
                      <option value="badge1">Badge 1</option>
                      <option value="badge2">Badge 2</option>
                      <option value="badge3">Badge 3</option>
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
                      <option value="badge">Badge</option>
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
          {sortedTeams.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      </main>
    </div>
  );
}
