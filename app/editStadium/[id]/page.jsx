import EditStadiumForm from "@/components/EditStadiumForm";

const getStadiumById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/stadium/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch stadium");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditStadium({ params }) {
  const { id } = params;
  const { stadium } = await getStadiumById(id);
  const { name, code, city } = stadium;

  return (
    <EditStadiumForm
      id={id}
      name={name}
      code={code}
      city={city} // Assuming you need the city ID or name
    />
  );
}
