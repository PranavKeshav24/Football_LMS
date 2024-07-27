import connectMongoDB from "@/libs/mongodb";
import MatchCup from "@/models/MatchCup";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const matchCup = await MatchCup.findById(id);

    if (!matchCup) {
      return NextResponse.json(
        { error: "Match Cup not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ matchCup }, { status: 200 });
  } catch (error) {
    console.error("Error fetching match cup: ", error);
    return NextResponse.json(
      { error: "Failed to fetch match cup" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { competition_name, edition, round } = await request.json();

  try {
    await connectMongoDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await MatchCup.findByIdAndUpdate(
      id,
      { competition_name, edition, round },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Match Cup not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Match Cup updated", matchCup: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating match cup: ", error);
    return NextResponse.json(
      { error: "Failed to update match cup" },
      { status: 500 }
    );
  }
}
