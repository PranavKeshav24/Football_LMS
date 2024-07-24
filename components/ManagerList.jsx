"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManagerList() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch("/api/manager");
        const data = await res.json();
        setManagers(data.managers);
      } catch (error) {
        console.error("Failed to fetch managers:", error);
      }
    };

    fetchManagers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/manager?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setManagers(managers.filter((manager) => manager._id !== id));
      } else {
        throw new Error("Failed to delete manager");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manager List</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Sportsman</th>
            <th className="border border-gray-300 p-2">Team</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager, index) => (
            <tr key={manager._id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                {manager.sportsman
                  ? `${manager.sportsman.name} ${manager.sportsman.surname_1} ${manager.sportsman.surname_2}`
                  : "N/A"}
              </td>
              <td className="border border-gray-300 p-2">
                {manager.team ? manager.team.name : "N/A"}
              </td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                <Link
                  href={`/editManager/${manager._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(manager._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
