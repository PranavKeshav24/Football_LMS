import EditSportsmanForm from "@/components/EditSportsmanForm";

const getSportsmanById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/sportsman/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sportsman");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditSportsman({ params }) {
  const { id } = params;
  const { sportsman } = await getSportsmanById(id);
  const {
    code,
    name,
    surname_1: surname1,
    surname_2: surname2,
    football_name: footballName,
  } = sportsman;

  return (
    <EditSportsmanForm
      id={id}
      code={code}
      name={name}
      surname1={surname1}
      surname2={surname2}
      footballName={footballName}
    />
  );
}
