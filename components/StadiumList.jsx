import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getStadiums = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/stadium", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch stadiums");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading stadiums: ", error);
    return { stadiums: [] }; // Return an empty array in case of an error
  }
};

export default async function StadiumList() {
  const { stadiums } = await getStadiums();

  return (
    <>
      {stadiums && stadiums.length > 0 ? (
        stadiums.map((stadium) => (
          <div
            key={stadium._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{stadium.name}</h2>
              <div>Code: {stadium.code}</div>
              <div>City: {stadium.city.name}</div>{" "}
              {/* Assuming city is populated */}
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={stadium._id} />
              <Link href={`/editStadium/${stadium._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No stadiums found.</p>
      )}
    </>
  );
}
