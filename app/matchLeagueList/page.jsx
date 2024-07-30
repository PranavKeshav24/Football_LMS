"use client";

import { useEffect, useState, useMemo } from "react";
import MatchLeagueCard from "@/components/MatchLeagueCard";
import { HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // replace with your API URL

const fetchMatchLeagues = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/matchLeague`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data.matchLeagues)) {
      return data.matchLeagues;
    } else {
      console.error("Fetched data is not an array", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching match leagues:", error);
    return [];
  }
};

export default function MatchLeagueList() {
  const [matchLeagues, setMatchLeagues] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "competition_name", order: "asc" });
  const [filter, setFilter] = useState({ tier: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const getMatchLeagues = async () => {
      const data = await fetchMatchLeagues();
      setMatchLeagues(data);
    };
    getMatchLeagues();
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
  const handleFilterTier = (tier) => {
    setFilter({ tier: tier === "all" ? "all" : tier });
    setIsFilterMenuOpen(false); // Close the filter menu after selection
  };

  const filteredMatchLeagues = useMemo(() => {
    if (!Array.isArray(matchLeagues)) return [];
    return matchLeagues
      .filter((matchLeague) =>
        matchLeague.competition_name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((matchLeague) =>
        filter.tier === "all" ? true : matchLeague.tier === filter.tier
      );
  }, [matchLeagues, search, filter]);

  const sortedMatchLeagues = useMemo(() => {
    return filteredMatchLeagues.sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.order === "asc" ? -1 : 1;
      if (a[sort.key] > b[sort.key]) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredMatchLeagues, sort]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search match leagues..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addMatchLeague"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Match League</span>
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
                    <label className="block mb-2">Tier</label>
                    <select
                      value={filter.tier}
                      onChange={(e) => handleFilterTier(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Tiers</option>
                      <option value="tier1">Tier 1</option>
                      <option value="tier2">Tier 2</option>
                      <option value="tier3">Tier 3</option>
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
                      <option value="tier">Tier</option>
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
          {sortedMatchLeagues.map((matchLeague) => (
            <MatchLeagueCard key={matchLeague._id} matchLeague={matchLeague} />
          ))}
        </div>
      </main>
    </div>
  );
}
