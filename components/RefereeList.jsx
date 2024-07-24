import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getReferees = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/referee", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch referees");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading referees: ", error);
    return { referees: [] }; // Return an empty array in case of an error
  }
};

export default async function RefereeList() {
  const { referees } = await getReferees();

  return (
    <>
      {referees && referees.length > 0 ? (
        referees.map((referee) => (
          <div
            key={referee._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{referee.name}</h2>
              <div>Code: {referee.code}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={referee._id} />
              <Link href={`/editReferee/${referee._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No referees found.</p>
      )}
    </>
  );
}
