// components/CityList.jsx
"use client";

import { useState, useMemo, useEffect } from "react";
import CityCard from "@/components/CityCard";
import { HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // replace with your API URL

const fetchCities = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/city`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data.cities)) {
      return data.cities;
    } else {
      console.error("Fetched data is not an array", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

export default function CityList() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  const [filter, setFilter] = useState({ province: "all", state: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getCities = async () => {
      const data = await fetchCities();
      setCities(data);
    };
    getCities();
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

  const handleFilterProvince = (province) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      province: province === "all" ? "all" : province.toLowerCase(),
    }));
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const handleFilterState = (state) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      state: state === "all" ? "all" : state.toLowerCase(),
    }));
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredCities = useMemo(() => {
    if (!Array.isArray(cities)) return [];
    return cities
      .filter(
        (city) =>
          city.name && city.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((city) =>
        filter.province === "all"
          ? true
          : city.province && city.province.toLowerCase() === filter.province
      )
      .filter((city) =>
        filter.state === "all"
          ? true
          : city.state && city.state.toLowerCase() === filter.state
      );
  }, [cities, search, filter]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cities..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addCity"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add City</span>
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
                    <label className="block mb-2">Province</label>
                    <select
                      value={filter.province}
                      onChange={(e) => handleFilterProvince(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Provinces</option>
                      <option value="province1">Province 1</option>
                      <option value="province2">Province 2</option>
                      <option value="province3">Province 3</option>
                    </select>
                  </div>
                  <div className="p-2">
                    <label className="block mb-2">State</label>
                    <select
                      value={filter.state}
                      onChange={(e) => handleFilterState(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All States</option>
                      <option value="state1">State 1</option>
                      <option value="state2">State 2</option>
                      <option value="state3">State 3</option>
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
                      <option value="province">Province</option>
                      <option value="state">State</option>
                      <option value="country">Country</option>
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
          {filteredCities.map((city) => (
            <CityCard key={city._id} city={city} />
          ))}
        </div>
      </main>
    </div>
  );
}
