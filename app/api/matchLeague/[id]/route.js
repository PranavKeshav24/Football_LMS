import connectMongoDB from "@/libs/mongodb";
import MatchLeague from "@/models/MatchLeague";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  const { id } = params;
  const { competition_name, tier, group, week } = await request.json();

  // Validate input
  if (!competition_name || !tier) {
    return NextResponse.json(
      { error: "Competition name and tier are required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await MatchLeague.findByIdAndUpdate(
      id,
      { competition_name, tier, group, week },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Match League not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Match League updated", matchLeague: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating match league: ", error);
    return NextResponse.json(
      { error: "Failed to update match league" },
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

    const matchLeague = await MatchLeague.findById(id);

    if (!matchLeague) {
      return NextResponse.json(
        { error: "Match League not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ matchLeague }, { status: 200 });
  } catch (error) {
    console.error("Error fetching match league: ", error);
    return NextResponse.json(
      { error: "Failed to fetch match league" },
      { status: 500 }
    );
  }
}
