"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id, endpoint }) {
  const router = useRouter();
  const removePlayer = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/${endpoint}?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removePlayer} className="text-red-400">
      <HiOutlineTrash className="w-6 h-6" />
    </button>
  );
}
