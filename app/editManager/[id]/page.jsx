import EditManagerForm from "@/components/EditManagerForm";

const getManagerById = async (id) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/manager/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch manager");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditManager({ params }) {
  const { id } = params;
  const { manager } = await getManagerById(id);

  return (
    <div>
      <h1>Edit Manager</h1>
      <EditManagerForm {...manager} />
    </div>
  );
}
