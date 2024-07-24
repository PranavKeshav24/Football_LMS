import connectMongoDB from "@/libs/mongodb";
import Stadium from "@/models/Stadium";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, code, city } = await request.json();

  // Validate input
  if (!name || !code || !city) {
    return NextResponse.json(
      { error: "Name, Code, and City are required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await Stadium.findByIdAndUpdate(
      id,
      { name, code, city },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "Stadium not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Stadium updated", stadium: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating stadium: ", error);
    return NextResponse.json(
      { error: "Failed to update stadium" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const stadium = await Stadium.findById(id).populate("city"); // Assuming you want to populate the city reference

    if (!stadium) {
      return NextResponse.json({ error: "Stadium not found" }, { status: 404 });
    }

    return NextResponse.json({ stadium }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stadium: ", error);
    return NextResponse.json(
      { error: "Failed to fetch stadium" },
      { status: 500 }
    );
  }
}
