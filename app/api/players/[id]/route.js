import connectMongoDB from "@/libs/mongodb";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      newSportsman: sportsman,
      newTeam: team,
      newPosition: position,
      newHome: home,
      newStarts: starts,
      newMinutes: minutes,
      newSub_min: sub_min,
      newYellow_1: yellow_1,
      newYellow_2: yellow_2,
      newRed: red,
    } = await request.json();

    await connectMongoDB();
    const result = await Player.findByIdAndUpdate(
      id,
      {
        sportsman,
        team,
        position,
        home,
        starts,
        minutes,
        sub_min,
        yellow_1,
        yellow_2,
        red,
      },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Player updated", player: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json(
      { message: "Error updating player" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const player = await Player.findById(id);

    if (!player) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ player }, { status: 200 });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { message: "Error fetching player" },
      { status: 500 }
    );
  }
}
