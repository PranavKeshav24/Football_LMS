import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getMatchLeagues = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/matchLeague`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch match leagues");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading match leagues: ", error);
    return { matchLeagues: [] }; // Return an empty array in case of an error
  }
};

export default async function MatchLeagueList() {
  const { matchLeagues } = await getMatchLeagues();

  return (
    <>
      {matchLeagues && matchLeagues.length > 0 ? (
        matchLeagues.map((matchLeague) => (
          <div
            key={matchLeague._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">
                {matchLeague.competition_name}
              </h2>
              <div>Tier: {matchLeague.tier}</div>
              <div>Group: {matchLeague.group || "N/A"}</div>
              <div>Week: {matchLeague.week || "N/A"}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={matchLeague._id} />
              <Link href={`/editMatchLeague/${matchLeague._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No match leagues found.</p>
      )}
    </>
  );
}
