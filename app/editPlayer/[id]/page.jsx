import EditPlayerForm from "@/components/EditPlayerForm";

const getPlayerById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/players/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch player");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditPlayer({ params }) {
  const { id } = params;
  const { player } = await getPlayerById(id);
  const {
    sportsman,
    team,
    position,
    home,
    starts,
    minutes,
    sub_min,
    yellow_1,
    yellow_2,
    red,
  } = player;

  return (
    <EditPlayerForm
      id={id}
      sportsman={sportsman}
      team={team}
      position={position}
      home={home}
      starts={starts}
      minutes={minutes}
      sub_min={sub_min}
      yellow_1={yellow_1}
      yellow_2={yellow_2}
      red={red}
    />
  );
}
