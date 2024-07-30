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
    goals_home: goalsHome,
    goals_away: goalsAway,
    observations,
    chronicle,
    referee,
    home_team: homeTeam,
    away_team: awayTeam,
    stadium,
    league,
    cup,
  } = match;

  return (
    <EditMatchForm
      id={id}
      initialDate={date}
      initialGoalsHome={goalsHome}
      initialGoalsAway={goalsAway}
      initialObservations={observations}
      initialChronicle={chronicle}
      initialReferee={referee}
      initialHomeTeam={homeTeam}
      initialAwayTeam={awayTeam}
      initialStadium={stadium}
      initialLeague={league}
      initialCup={cup}
    />
  );
}
