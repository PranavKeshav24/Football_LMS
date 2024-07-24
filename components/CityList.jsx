import Link from "next/link";
import RemoveBtn from "@/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getCities = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/city", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cities");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading cities: ", error);
    return { cities: [] }; // Return an empty array in case of an error
  }
};

export default async function CitiesList() {
  const { cities } = await getCities();

  return (
    <>
      {cities && cities.length > 0 ? (
        cities.map((city) => (
          <div
            key={city._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{city.name}</h2>
              <div>Code: {city.code}</div>
              <div>Province: {city.province || "N/A"}</div>
              <div>State: {city.state || "N/A"}</div>
              <div>Country: {city.country}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={city._id} />
              <Link href={`/editCity/${city._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No cities found.</p>
      )}
    </>
  );
}
