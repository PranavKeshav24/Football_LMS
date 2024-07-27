import connectMongoDB from "@/libs/mongodb";
import Team from "@/models/Team";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, badge, is_home, is_away } = await request.json();

  // Validate input
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await Team.findByIdAndUpdate(
      id,
      { name, badge, is_home, is_away },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Team updated", team: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating team: ", error);
    return NextResponse.json(
      { error: "Failed to update team" },
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

    const team = await Team.findById(id);

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json({ team }, { status: 200 });
  } catch (error) {
    console.error("Error fetching team: ", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}
