import EditMatchForm from "@/components/EditMatchForm";

const getMatchById = async (id) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/match/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch match");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return { match: null };
  }
};

export default async function EditMatch({ params }) {
  const { id } = params;
  const { match } = await getMatchById(id);

  if (!match) {
    return <div>Error loading match data</div>;
  }

  const {
    date,
    goals_home,
    goals_away,
    observations,
    chronicle,
    referee,
    home_team,
    away_team,
    stadium,
    league,
    cup,
  } = match;

  return (
    <EditMatchForm
      id={id}
      date={date}
      goalsHome={goals_home}
      goalsAway={goals_away}
      observations={observations}
      chronicle={chronicle}
      referee={referee}
      homeTeam={home_team}
      awayTeam={away_team}
      stadium={stadium}
      league={league}
      cup={cup}
    />
  );
}
