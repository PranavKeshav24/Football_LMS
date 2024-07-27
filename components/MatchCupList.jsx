import Link from "next/link";
import RemoveBtn from "@/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getMatchCups = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

export default async function MatchCupsList() {
  const matchCups = await getMatchCups();

  return (
    <>
      {matchCups.length > 0 ? (
        matchCups.map((matchCup) => (
          <div
            key={matchCup._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">
                {matchCup.competition_name}
              </h2>
              <div>Edition: {matchCup.edition}</div>
              <div>Round: {matchCup.round}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={matchCup._id} />
              <Link href={`/editMatchCup/${matchCup._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No match cups found.</p>
      )}
    </>
  );
}
