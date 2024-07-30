"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EditPlayerXerezForm from "@/components/EditPlayerXerezForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditPlayerXerez() {
  const [playerXerez, setPlayerXerez] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const playerXerezId = searchParams.get("id");

  useEffect(() => {
    const fetchPlayerXerez = async () => {
      try {
        const res = await fetch(`${API_URL}/api/playerXerez/${playerXerezId}`);
        const data = await res.json();
        setPlayerXerez(data.data);
      } catch (error) {
        console.error("Error fetching PlayerXerez:", error);
      }
    };

    if (playerXerezId) {
      fetchPlayerXerez();
    }
  }, [playerXerezId]);

  const handleSubmit = async (updatedPlayerXerez) => {
    try {
      const res = await fetch(`${API_URL}/api/playerXerez/${playerXerezId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlayerXerez),
      });

      if (!res.ok) {
        throw new Error("Failed to update player");
      }

      router.push("/playerXerezList");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit PlayerXerez</h1>
      {playerXerez && (
        <EditPlayerXerezForm
          playerXerez={playerXerez}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
