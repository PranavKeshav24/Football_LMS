"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PlayerXerezList() {
  const [playerXerezList, setPlayerXerezList] = useState([]);

  useEffect(() => {
    const fetchPlayerXerezList = async () => {
      try {
        const res = await fetch(`${API_URL}/api/playerXerez`);
        const data = await res.json();
        setPlayerXerezList(data.data);
      } catch (error) {
        console.error("Error fetching PlayerXerez list:", error);
      }
    };

    fetchPlayerXerezList();
  }, []);

  return (
    <div>
      <h1>PlayerXerez List</h1>
      <ul>
        {playerXerezList.map((playerXerez) => (
          <li key={playerXerez._id}>
            {playerXerez.sportsman.name} - {playerXerez.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
