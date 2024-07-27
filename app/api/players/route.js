import connectMongoDB from "@/libs/mongodb";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
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
    } = await request.json();

    await connectMongoDB();

    const player = new Player({
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
    });

    await player.save();

    return NextResponse.json(
      { message: "Player Created", player },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { message: "Error creating player" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const Players = await Player.find();
    return NextResponse.json({ Players }, { status: 200 });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { message: "Error fetching players" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const result = await Player.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Player deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json(
      { message: "Error deleting player" },
      { status: 500 }
    );
  }
}
