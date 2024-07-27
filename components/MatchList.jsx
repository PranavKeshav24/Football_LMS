import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getMatches = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/match`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch matches");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading matches: ", error);
    return { matches: [] }; // Return an empty array in case of an error
  }
};

export default async function MatchList() {
  const { matches } = await getMatches();

  return (
    <>
      {matches && matches.length > 0 ? (
        matches.map((match) => (
          <div
            key={match._id}
            className="p-4 border border-slate-300 my-3 flex flex-col gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">
                {match.home_team.name} vs {match.away_team.name}
              </h2>
              <div>Date: {new Date(match.date).toLocaleString()}</div>
              <div>
                Goals: {match.goals_home} - {match.goals_away}
              </div>
              <div>Referee: {match.referee.name}</div>
              <div>Stadium: {match.stadium.name}</div>
              <div>League: {match.league.name}</div>
              <div>Cup: {match.cup ? match.cup.name : "N/A"}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={match._id} />
              <Link href={`/editMatch/${match._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No matches found.</p>
      )}
    </>
  );
}
