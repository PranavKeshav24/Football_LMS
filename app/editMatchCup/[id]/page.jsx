"use client";
import { useRouter } from "next/navigation";
import EditMatchCupForm from "@/components/EditMatchCupForm";
import { useEffect, useState } from "react";

export default function EditMatchCupPage({ params }) {
  const { id } = params;
  const [matchCup, setMatchCup] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMatchCup = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/matchCup/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch match cup");
        }
        const data = await res.json();
        setMatchCup(data.matchCup);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        router.push("/matchCups"); // Redirect or handle error as needed
      }
    };

    fetchMatchCup();
  }, [id, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!matchCup) {
    return <p>Match Cup not found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Match Cup</h1>
      <EditMatchCupForm
        id={id}
        competitionName={matchCup.competition_name}
        edition={matchCup.edition}
        round={matchCup.round}
      />
    </div>
  );
}
