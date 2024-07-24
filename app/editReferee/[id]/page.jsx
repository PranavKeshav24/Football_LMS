import EditRefereeForm from "@/components/EditRefereeForm";

const getRefereeById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/referee/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch referee");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditReferee({ params }) {
  const { id } = params;
  const { referee } = await getRefereeById(id);
  const { name, code } = referee;

  return <EditRefereeForm id={id} name={name} code={code} />;
}
