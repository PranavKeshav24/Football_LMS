"use client";
import { useRouter } from "next/navigation";
import EditMatchLeagueForm from "@/components/EditMatchLeagueForm";
import { useEffect, useState } from "react";

export default function EditMatchLeaguePage({ params }) {
  const { id } = params;
  const [matchLeague, setMatchLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMatchLeague = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/matchLeague/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch match league");
        }
        const data = await res.json();
        setMatchLeague(data.matchLeague);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        // Redirect or handle error as needed
        router.push("/");
      }
    };

    fetchMatchLeague();
  }, [id, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!matchLeague) {
    return <p>Match League not found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Match League</h1>
      <EditMatchLeagueForm
        id={id}
        competitionName={matchLeague.competition_name}
        tier={matchLeague.tier}
        group={matchLeague.group}
        week={matchLeague.week}
      />
    </div>
  );
}
