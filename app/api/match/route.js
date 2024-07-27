import connectMongoDB from "@/libs/mongodb";
import Match from "@/models/Match";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
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
    await Match.create({
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
    return NextResponse.json({ message: "Match created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create match" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const matches = await Match.find();
    return NextResponse.json({ matches }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
