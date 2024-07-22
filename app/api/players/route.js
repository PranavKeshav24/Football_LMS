import connectMongoDB from "@/libs/mongodb";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function POST(request) {
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
  await Player.create({
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
  return NextResponse.json({ message: "Player Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Players = await Player.find();
  return NextResponse.json({ Players });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Player.findByIdAndDelete(id);
  return NextResponse.json({ message: "Player deleted" }, { status: 200 });
}
