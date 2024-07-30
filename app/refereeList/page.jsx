"use client";

import { useState, useMemo, useEffect } from "react";
import RefereeCard from "@/components/RefereeCard"; // Adjust the path as necessary
import { HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // replace with your API URL

const fetchReferees = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/referee`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data.referees)) {
      return data.referees;
    } else {
      console.error("Fetched data is not an array", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching referees:", error);
    return [];
  }
};

export default function RefereeList() {
  const [referees, setReferees] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  const [filter, setFilter] = useState({ code: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getReferees = async () => {
      const data = await fetchReferees();
      setReferees(data);
    };
    getReferees();
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
  const handleFilterCode = (code) => {
    setFilter({ code: code === "all" ? "all" : code });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredReferees = useMemo(() => {
    if (!Array.isArray(referees)) return [];
    return referees
      .filter(
        (referee) =>
          referee.name &&
          referee.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((referee) =>
        filter.code === "all" ? true : referee.code === filter.code
      );
  }, [referees, search, sort, filter]);

  const sortedReferees = useMemo(() => {
    return filteredReferees.sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.order === "asc" ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredReferees, sort]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search referees..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addReferee"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Referee</span>
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
                    <label className="block mb-2">Code</label>
                    <select
                      value={filter.code}
                      onChange={(e) => handleFilterCode(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Codes</option>
                      {/* Add specific codes as options */}
                      <option value="ref1">Ref1</option>
                      <option value="ref2">Ref2</option>
                      <option value="ref3">Ref3</option>
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
                      <option value="code">Code</option>
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
          {sortedReferees.map((referee) => (
            <RefereeCard key={referee._id} referee={referee} />
          ))}
        </div>
      </main>
    </div>
  );
}
