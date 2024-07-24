import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTeams = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/team", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch teams");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading teams: ", error);
    return { teams: [] }; // Return an empty array in case of an error
  }
};

export default async function TeamsList() {
  const { teams } = await getTeams();

  return (
    <>
      {teams && teams.length > 0 ? (
        teams.map((team) => (
          <div
            key={team._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{team.name}</h2>
              <div>Badge: {team.badge}</div>
              <div>Home: {team.is_home ? "Yes" : "No"}</div>
              <div>Away: {team.is_away ? "Yes" : "No"}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={team._id} />
              <Link href={`/editTeam/${team._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No teams found.</p>
      )}
    </>
  );
}
