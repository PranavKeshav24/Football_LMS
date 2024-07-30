import connectMongoDB from "@/libs/mongodb";
import Match from "@/models/Match";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  const { id } = params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const match = await Match.findById(id).exec();
    if (!match) {
      return NextResponse.json({ message: "Match not found" }, { status: 404 });
    }
    return NextResponse.json({ match }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch match" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    date,
    goals_home,
    goals_away,
    observations,
    chronicle,
    referee,
    home_team,
    away_team,
    stadium,
    league,
    cup,
  } = await request.json();

  // Validate input
  if (!date) {
    return NextResponse.json({ message: "Date is required" }, { status: 400 });
  }

  // Validate ObjectId fields
  const objectIdFields = {
    referee,
    home_team,
    away_team,
    stadium,
    league,
    cup,
  };
  for (const [key, value] of Object.entries(objectIdFields)) {
    if (value && !mongoose.Types.ObjectId.isValid(value)) {
      return NextResponse.json(
        { message: `${key} is invalid` },
        { status: 400 }
      );
    }
  }

  try {
    await connectMongoDB();
    await Match.findByIdAndUpdate(id, {
      date,
      goals_home,
      goals_away,
      observations,
      chronicle,
      referee,
      home_team,
      away_team,
      stadium,
      league,
      cup,
    });
    return NextResponse.json({ message: "Match updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update match" },
      { status: 500 }
    );
  }
}
