import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getSportsmen = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/sportsman`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sportsmen");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading sportsmen: ", error);
    return { sportsmen: [] }; // Return an empty array to prevent destructuring error
  }
};

export default async function SportsmanList() {
  const data = await getSportsmen();
  const sportsmen = data?.sportsmen || []; // Ensure sportsmen is always an array

  return (
    <>
      {sportsmen.length > 0 ? (
        sportsmen.map((s) => (
          <div
            key={s._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{s.name}</h2>
              <div>
                <p>
                  <strong>Code:</strong> {s.code}
                </p>
                <p>
                  <strong>Surname 1:</strong> {s.surname_1}
                </p>
                <p>
                  <strong>Surname 2:</strong> {s.surname_2}
                </p>
                <p>
                  <strong>Football Name:</strong> {s.football_name}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={s._id} />
              <Link href={`/editSportsman/${s._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No sportsmen found.</p>
      )}
    </>
  );
}
