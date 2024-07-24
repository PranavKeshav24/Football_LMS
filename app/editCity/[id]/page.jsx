import EditCityForm from "@/components/EditCityForm";

const getCityById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/city/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch city");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditCity({ params }) {
  const { id } = params;
  const { city } = await getCityById(id);
  const { name, code, province, state, country } = city;

  return (
    <EditCityForm
      id={id}
      name={name}
      code={code}
      province={province}
      state={state}
      country={country}
    />
  );
}
