"use client";

import { useEffect, useState, useMemo } from "react";
import ManagerCard from "@/components/ManagerCard";
import { HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // replace with your API URL

const fetchManagers = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/manager`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data.managers)) {
      return data.managers;
    } else {
      console.error("Fetched data is not an array", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching managers:", error);
    return [];
  }
};

export default function ManagerList() {
  const [managers, setManagers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  const [filter, setFilter] = useState({ team: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getManagers = async () => {
      const data = await fetchManagers();
      setManagers(data);
    };
    getManagers();
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
  const handleFilterTeam = (team) => {
    setFilter({ team: team === "all" ? "all" : team });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredManagers = useMemo(() => {
    if (!Array.isArray(managers)) return [];
    return managers
      .filter(
        (manager) =>
          manager.sportsman &&
          manager.sportsman.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((manager) =>
        filter.team === "all" ? true : manager.team === filter.team
      );
  }, [managers, search, filter]);

  const sortedManagers = useMemo(() => {
    return filteredManagers.sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.order === "asc" ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredManagers, sort]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search managers..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addManager"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Manager</span>
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
                    <label className="block mb-2">Team</label>
                    <select
                      value={filter.team}
                      onChange={(e) => handleFilterTeam(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Teams</option>
                      <option value="team1">Team 1</option>
                      <option value="team2">Team 2</option>
                      <option value="team3">Team 3</option>
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
                      <option value="team">Team</option>
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
          {sortedManagers.map((manager) => (
            <ManagerCard key={manager._id} manager={manager} />
          ))}
        </div>
      </main>
    </div>
  );
}
