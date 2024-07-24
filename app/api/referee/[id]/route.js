import connectMongoDB from "@/libs/mongodb";
import Referee from "@/models/Referee";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, code } = await request.json();

  // Validate input
  if (!name || !code) {
    return NextResponse.json(
      { error: "Name and Code are required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await Referee.findByIdAndUpdate(
      id,
      { name, code },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "Referee not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Referee updated", referee: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating referee: ", error);
    return NextResponse.json(
      { error: "Failed to update referee" },
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

    const referee = await Referee.findById(id);

    if (!referee) {
      return NextResponse.json({ error: "Referee not found" }, { status: 404 });
    }

    return NextResponse.json({ referee }, { status: 200 });
  } catch (error) {
    console.error("Error fetching referee: ", error);
    return NextResponse.json(
      { error: "Failed to fetch referee" },
      { status: 500 }
    );
  }
}
