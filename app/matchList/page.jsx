"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "@/components/RemoveBtn";
import { HiPencilAlt, HiPlus } from "react-icons/hi";
import {
  FilterIcon,
  ListOrderedIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import MatchCard from "@/components/MatchCard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchById = async (endpoint, id, prop) => {
  try {
    const res = await fetch(`${apiUrl}/api/${endpoint}?${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    const data = await res.json();
    const item = data[endpoint + "s"].find((item) => item._id === id);

    return item ? item[prop] : "";
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return "";
  }
};

const getMatches = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/match`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch matches");
    }

    const data = await res.json();
    const matches = data.matches || [];

    const enrichedMatches = await Promise.all(
      matches.map(async (match) => {
        const home_team_name = await fetchById("team", match.home_team, "name");
        const away_team_name = await fetchById("team", match.away_team, "name");
        const referee_name = await fetchById("referee", match.referee, "name");
        const stadium_name = await fetchById("stadium", match.stadium, "name");
        const league_name = await fetchById(
          "matchLeague",
          match.league,
          "competition_name"
        );
        const cup_name = match.cup
          ? await fetchById("matchCup", match.cup, "competition_name")
          : null;

        return {
          ...match,
          home_team: { name: home_team_name },
          away_team: { name: away_team_name },
          referee: { name: referee_name },
          stadium: { name: stadium_name },
          league: { name: league_name },
          cup: cup_name ? { name: cup_name } : null,
        };
      })
    );

    return { matches: enrichedMatches };
  } catch (error) {
    console.log("Error loading matches:", error);
    return { matches: [] };
  }
};

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "date", order: "asc" });
  const [filter, setFilter] = useState({ league: "all", cup: "all" });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await getMatches();
      setMatches(data.matches);
    };
    fetchMatches();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
    setIsSortMenuOpen(false);
  };
  const handleFilterLeague = (league) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      league: league === "all" ? "all" : league.toLowerCase(),
    }));
    setIsFilterMenuOpen(false);
  };
  const handleFilterCup = (cup) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      cup: cup === "all" ? "all" : cup.toLowerCase(),
    }));
    setIsFilterMenuOpen(false);
  };

  const filteredMatches = useMemo(() => {
    if (!Array.isArray(matches)) return [];
    return matches
      .filter(
        (match) =>
          match.home_team.name.toLowerCase().includes(search.toLowerCase()) ||
          match.away_team.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((match) =>
        filter.league === "all"
          ? true
          : match.league && match.league.name.toLowerCase() === filter.league
      )
      .filter((match) =>
        filter.cup === "all"
          ? true
          : match.cup && match.cup.name.toLowerCase() === filter.cup
      );
  }, [matches, search, sort, filter]);

  const sortedMatches = useMemo(() => {
    return filteredMatches.sort((a, b) => {
      if (sort.key === "date") {
        return sort.order === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }, [filteredMatches, sort]);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search matches..."
              value={search}
              onChange={handleSearch}
              className="pl-10 w-full p-2 border rounded"
            />
          </div>
          <Link
            className="flex items-center gap-2 p-2 border rounded"
            href="/addMatch"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Match</span>
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
                    <label className="block mb-2">League</label>
                    <select
                      value={filter.league}
                      onChange={(e) => handleFilterLeague(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Leagues</option>
                      <option value="premier-league">Premier League</option>
                      <option value="la-liga">La Liga</option>
                      <option value="bundesliga">Bundesliga</option>
                    </select>
                  </div>
                  <div className="p-2">
                    <label className="block mb-2">Cup</label>
                    <select
                      value={filter.cup}
                      onChange={(e) => handleFilterCup(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="all">All Cups</option>
                      <option value="fa-cup">FA Cup</option>
                      <option value="champions-league">Champions League</option>
                      <option value="europa-league">Europa League</option>
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
                      <option value="date">Date</option>
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
          {matches.map((m) => (
            <MatchCard key={m._id} match={m} />
          ))}
        </div>
      </main>
    </div>
  );
}
