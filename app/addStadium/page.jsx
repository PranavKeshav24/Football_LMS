"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddStadium() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]); // To hold city options for the dropdown

  const router = useRouter();

  // Fetch city options from the API (assuming you have an endpoint for cities)
  const fetchCities = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/city`);
      if (res.ok) {
        const cities = await res.json();
        setCityOptions(cities); // Assuming cities is an array of { _id, name }
      } else {
        throw new Error("Failed to fetch cities");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Call fetchCities when the component mounts
  useEffect(() => {
    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code || !city) {
      alert("Name, Code, and City are required.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/stadium`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, code, city }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to the home page or any other desired page
      } else {
        throw new Error("Failed to add stadium");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="font-bold" htmlFor="name">
        Stadium Name:
      </label>
      <input
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Stadium Name"
      />

      <label className="font-bold" htmlFor="code">
        Code:
      </label>
      <input
        id="code"
        onChange={(e) => setCode(e.target.value)}
        value={code}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Code"
      />

      <label className="font-bold" htmlFor="city">
        City:
      </label>
      <select
        id="city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className="border border-slate-500 px-8 py-2"
      >
        <option value="">Select a City</option>
        {cityOptions.map((city) => (
          <option key={city._id} value={city._id}>
            {city.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Stadium
      </button>
    </form>
  );
}
