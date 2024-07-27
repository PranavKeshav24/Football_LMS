import connectMongoDB from "@/libs/mongodb";
import City from "@/models/City";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, code, province, state, country } = await request.json();

  if (!name || !code || !country) {
    return NextResponse.json(
      { error: "Name, Code, and Country are required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await City.findByIdAndUpdate(
      id,
      { name, code, province, state, country },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "City updated", city: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating city: ", error);
    return NextResponse.json(
      { error: "Failed to update city" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const city = await City.findById(id);

    if (!city) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    return NextResponse.json({ city }, { status: 200 });
  } catch (error) {
    console.error("Error fetching city: ", error);
    return NextResponse.json(
      { error: "Failed to fetch city" },
      { status: 500 }
    );
  }
}
