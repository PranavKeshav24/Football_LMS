"use client";

import { useState, useMemo, useEffect } from "react";
import StadiumCard from "@/components/StadiumCard"; // Adjust the path as necessary
import { HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // replace with your API URL

const fetchStadiums = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/stadium`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data.stadiums)) {
      return data.stadiums;
    } else {
      console.error("Fetched data is not an array", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching stadiums:", error);
    return [];
  }
};

export default function StadiumList() {
  const [stadiums, setStadiums] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  const [filter, setFilter] = useState({ city: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getStadiums = async () => {
      const data = await fetchStadiums();
      setStadiums(data);
    };
    getStadiums();
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
  const handleFilterCity = (city) => {
    setFilter({ city: city === "all" ? "all" : city });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredStadiums = useMemo(() => {
    if (!Array.isArray(stadiums)) return [];
    return stadiums
      .filter(
        (stadium) =>
          stadium.name &&
          stadium.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((stadium) =>
        filter.city === "all" ? true : stadium.city?.name === filter.city
      );
  }, [stadiums, search, sort, filter]);

  const sortedStadiums = useMemo(() => {
    return filteredStadiums.sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.order === "asc" ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredStadiums, sort]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stadiums..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addStadium"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Stadium</span>
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
                    <label className="block mb-2">City</label>
                    <select
                      value={filter.city}
                      onChange={(e) => handleFilterCity(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Cities</option>
                      {/* Add specific cities as options */}
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
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
          {sortedStadiums.map((stadium) => (
            <StadiumCard key={stadium._id} stadium={stadium} />
          ))}
        </div>
      </main>
    </div>
  );
}
