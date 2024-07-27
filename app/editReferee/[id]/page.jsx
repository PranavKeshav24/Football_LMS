import EditRefereeForm from "@/components/EditRefereeForm";

const getRefereeById = async (id) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/referee/${id}`, {
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
